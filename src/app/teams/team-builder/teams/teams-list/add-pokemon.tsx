"use client";

import { Button } from "@/components/ui/button";
import { Team } from "@/types/pokemon";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AddTeamProps {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  router: AppRouterInstance;
}

export const AddTeam = ({ teams, router, setTeams }: AddTeamProps) => {
  const handleAddTeam = () => {
    const id = `team-${Date.now()}`;

    const usedNumbers = teams
      .map((team) => {
        const match = team.name.match(/Team (\d+)/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n): n is number => n !== null)
      .sort((a, b) => a - b);

    let availableNumber = 1;
    for (const num of usedNumbers) {
      if (num === availableNumber) {
        availableNumber++;
      } else {
        break;
      }
    }

    const newTeam: Team = {
      id,
      name: `Team ${availableNumber}`,
      members: [],
    };

    const updatedTeams = [...teams, newTeam];
    localStorage.setItem("teams", JSON.stringify({ teams: updatedTeams }));
    setTeams(updatedTeams);
    router.push(`/teams/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Button
        variant="outline"
        className="justify-start cursor-pointer"
        onClick={handleAddTeam}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span>Add Team</span>
      </Button>
    </motion.div>
  );
};
