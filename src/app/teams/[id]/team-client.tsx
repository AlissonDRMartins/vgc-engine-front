"use client";

import { motion } from "framer-motion";

import { GengarLoading } from "@/components/loadings/gengar-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { PokeService } from "@/services/poke";
import { BackButton } from "./components/back-button";
import { TeamName } from "./components/team-name";
import { AddPokemon } from "./components/add-pokemon";
import { useTeamStorage } from "./components/useTeamStorage";
import { TeamList } from "./components/team-list";

export function TeamClient({ teamId }: { teamId: string }) {
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  const { team, updateTeam, addMember, updateMember } = useTeamStorage(teamId);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await PokeService.getPokemonList(0, 1500);
      const pokemonNames = response.results.map((pokemon) => pokemon.name);
      setPokemonList(pokemonNames);
    };
    fetchPokemonList();
  }, []);

  if (!team) return <GengarLoading />;

  return (
    <div className="p-4">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        exit={{ opacity: 0, y: 20 }}
        className="flex justify-center"
      >
        <Card className="w-full min-h-[calc(100vh-9rem)] max-w-[1500px]">
          <CardHeader>
            <CardTitle className="gap-2 flex flex-col">
              <TeamName teamName={team.name} updateTeam={updateTeam} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddPokemon
              pokemonList={pokemonList}
              addMember={addMember}
              team={team}
            />
            <TeamList team={team} updateMember={updateMember} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
