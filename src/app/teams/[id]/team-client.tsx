"use client";

import { motion } from "framer-motion";

import { DarumakaLoading } from "@/components/loadings/darumaka-loading";
import { Card } from "@/components/ui/card";
import { BackButton } from "./components/back-button";
import { useTeamStorage } from "./hook/useTeamStorage";
import { TeamHeader } from "./components/team-header";
import { TeamProvider } from "./context/team-context";
import { TeamContent } from "./components/team-content";

export function TeamClient({ teamId }: { teamId: string }) {
  const {
    team,
    updateTeam,
    addMember,
    updateMember,
    removeMember,
    getMember,
    pokemonSelected,
    setPokemonSelected,
  } = useTeamStorage(teamId);

  if (!team) return <DarumakaLoading />;

  return (
    <TeamProvider
      value={{
        team,
        updateTeam,
        addMember,
        updateMember,
        removeMember,
        getMember,
        pokemonSelected,
        setPokemonSelected,
      }}
    >
      <div className="p-4">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          exit={{ opacity: 0, y: 20 }}
          className="flex justify-center"
        >
          <Card className="w-full min-h-[calc(100vh-9rem)] max-w-[1500px]">
            <TeamHeader />
            <TeamContent />
          </Card>
        </motion.div>
      </div>
    </TeamProvider>
  );
}
