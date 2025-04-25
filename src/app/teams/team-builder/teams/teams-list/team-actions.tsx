import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Ellipsis, List, Trash2, Upload } from "lucide-react";
import { Team } from "@/types/pokemon";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface TeamsActionsProps {
  router: AppRouterInstance;
  team: Team;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const TeamActions = ({
  router,
  setIsLoading,
  setTeams,
  team,
  teams,
}: TeamsActionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteTeam = (teamId: string) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    localStorage.setItem("teams", JSON.stringify({ teams: updatedTeams }));
    setIsLoading(true);
    setTeams(updatedTeams);
    setIsDialogOpen(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={(e) => e.stopPropagation()}>
          <Ellipsis className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem onClick={() => router.push(`/teams/${team.id}`)}>
          <List className="text-black dark:text-white" />
          <span>Edit team</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Upload className="text-black dark:text-white" />
          <span>Export team</span>
        </DropdownMenuItem>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                className="hover:!bg-red-500 hover:!text-white group"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2 className="text-black dark:text-white group-hover:text-white" />
                <span>Delete team</span>
              </DropdownMenuItem>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 items-center">
                <AlertTriangle className="text-red-500" />
                Are you sure?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="gap-1 flex">
              This action cannot be undone. This will permanently
              <span className="text-red-500 font-bold italic">delete</span>
              the team.
            </DialogDescription>
            <DialogFooter>
              <Button
                className="cursor-pointer bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                onClick={(e) => {
                  handleDeleteTeam(team.id);
                  e.stopPropagation();
                }}
              >
                <span>Delete</span>
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={(e) => {
                  setIsDialogOpen(false);
                  e.stopPropagation();
                }}
              >
                <span>Close</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
