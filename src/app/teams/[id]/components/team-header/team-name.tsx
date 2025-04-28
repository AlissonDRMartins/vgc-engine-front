"use client";

import { Input } from "@/components/ui/input";
import { Team } from "@/types/pokemon";
import { useEffect, useState } from "react";

interface TeamNameProps {
  teamName: string;
  updateTeam: (updater: (prev: Team) => Team) => void;
}

export const TeamName = ({ teamName, updateTeam }: TeamNameProps) => {
  const [localTeamName, setLocalTeamName] = useState(teamName);

  useEffect(() => {
    setLocalTeamName(teamName);
  }, [teamName]);

  const handleNameBlur = () => {
    const generateGenericName = () => {
      const seed = Date.now();
      const adj = adjectives[seed % adjectives.length];
      const poke = pokemons[(seed >> 3) % pokemons.length];

      return `Team ${adj} ${poke}`;
    };

    const fallbackName = generateGenericName();

    updateTeam((prev) => ({
      ...prev,
      name: localTeamName.trim() === "" ? fallbackName : localTeamName,
    }));
  };

  return (
    <>
      <span>Team name:</span>
      <Input
        placeholder="Team"
        value={localTeamName}
        onChange={(e) => setLocalTeamName(e.target.value)}
        onBlur={handleNameBlur}
      />
    </>
  );
};

const adjectives = [
  "Brave",
  "Swift",
  "Silent",
  "Mighty",
  "Shadow",
  "Fiery",
  "Stormy",
  "Lone",
  "Wild",
  "Electric",
];
const pokemons = [
  "Pikachu",
  "Charizard",
  "Bulbasaur",
  "Gengar",
  "Snorlax",
  "Eevee",
  "Mewtwo",
  "Squirtle",
  "Dragonite",
  "Lucario",
];
