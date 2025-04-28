"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Team, PokemonInfo } from "@/types/pokemon";

interface TeamContextType {
  team: Team;
  updateTeam: (updater: (prev: Team) => Team) => void;
  addMember: (pokemon: PokemonInfo) => void;
  updateMember: (
    index: number,
    updater: (prev: PokemonInfo) => PokemonInfo
  ) => void;
  removeMember: (index: number) => void;
  getMember: (index: number) => PokemonInfo | undefined;
  pokemonSelected: PokemonInfo | null;
  setPokemonSelected: Dispatch<SetStateAction<PokemonInfo | null>>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TeamContextType;
}) => {
  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context)
    throw new Error("useTeamContext must be used within a TeamProvider");

  return context;
};
