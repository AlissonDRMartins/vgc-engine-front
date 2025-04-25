import { Team } from "@/types/pokemon";
import { useEffect, useState } from "react";

export const useTeamStorage = (teamId: string) => {
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("teams");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const teams: Team[] = parsed.teams || [];
        const foundTeam = teams.find((t) => t.id === teamId) || null;
        setTeam(foundTeam);
      } catch (e) {
        console.error("Erro ao ler times:", e);
        setTeam(null);
      }
    }
  }, [teamId]);

  const updateTeam = (updater: (prev: Team) => Team) => {
    const stored = localStorage.getItem("teams");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const teams: Team[] = parsed.teams || [];

      const index = teams.findIndex((t) => t.id === teamId);
      if (index === -1) return;

      const updatedTeam = updater(teams[index]);
      teams[index] = updatedTeam;

      localStorage.setItem("teams", JSON.stringify({ teams }));
      setTeam(updatedTeam);
    } catch (e) {
      console.error("Erro ao atualizar time:", e);
    }
  };

  return { team, updateTeam };
};
