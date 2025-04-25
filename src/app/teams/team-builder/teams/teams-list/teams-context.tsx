"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Team } from "@/types/pokemon";
import { AlertTriangle, List, Trash2, Upload } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction, useState } from "react";

interface TeamsContextProps {
  router: AppRouterInstance;
  team: Team;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const TeamsContext = ({
  router,
  team,
  teams,
  setTeams,
  setIsLoading,
}: TeamsContextProps) => {
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
    <ContextMenuContent className="w-64">
      <ContextMenuItem onClick={() => router.push(`/teams/${team.id}`)}>
        <List className="text-black dark:text-white" />
        <span>Edit team</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <Upload className="text-black dark:text-white" />
        <span>Export team</span>
      </ContextMenuItem>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div onPointerDown={(e) => e.stopPropagation()}>
            <ContextMenuItem
              className="hover:!bg-red-500 hover:!text-white group"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="text-black dark:text-white group-hover:text-white" />
              <span>Delete team</span>
            </ContextMenuItem>
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
              onClick={() => handleDeleteTeam(team.id)}
            >
              <span>Delete</span>
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
            >
              <span>Close</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContextMenuContent>
  );
};
