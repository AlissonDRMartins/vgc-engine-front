"use client";

import { motion } from "framer-motion";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Team } from "@/types/pokemon";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { SnorlaxLoading } from "@/components/loadings/snorlax-loading";
import { AddTeam } from "./add-pokemon";
import { TeamsContext } from "./teams-context";
import { PokemonFrame } from "./pokemon-frame";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TeamActions } from "./team-actions";

export const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("teams");
    try {
      if (stored) {
        const parsed = JSON.parse(stored);
        setTeams(Array.isArray(parsed.teams) ? parsed.teams : []);
      }
    } catch (e) {
      console.error("Erro ao carregar times do localStorage:", e);
      setTeams([]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <AddTeam router={router} setTeams={setTeams} teams={teams} />
      <div className="w-full">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="p-4 flex justify-center w-full md:justify-start"
          >
            <SnorlaxLoading />
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {teams.map((team, index) => (
              <ContextMenu key={index}>
                <ContextMenuTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.2 + 0.3 }}
                  >
                    <Card
                      className="max-w-[1000px] w-full cursor-pointer hover:scale-[1.01] transition-transform"
                      onClick={() => {
                        router.push(`/teams/${team.id}`);
                      }}
                    >
                      <div className="flex justify-between items-center mx-6 -my-2">
                        <CardTitle>{team.name}</CardTitle>
                        <TeamActions
                          router={router}
                          setIsLoading={setIsLoading}
                          setTeams={setTeams}
                          team={team}
                          teams={teams}
                        />
                      </div>
                      <CardContent>
                        <div className="flex gap-1 md:gap-4 w-full">
                          {[...Array(6)].map((_, index) => {
                            const member = team.members[index];
                            const showPlus =
                              team.members.length === 0 && index === 0;

                            if (!showPlus) {
                              return (
                                <PokemonFrame
                                  index={index}
                                  member={member}
                                  router={router}
                                  team={team}
                                  key={index}
                                />
                              );
                            } else {
                              return (
                                <AddFrame
                                  index={index}
                                  team={team}
                                  router={router}
                                  key={index}
                                />
                              );
                            }
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ContextMenuTrigger>
                <TeamsContext
                  router={router}
                  setIsLoading={setIsLoading}
                  setTeams={setTeams}
                  team={team}
                  teams={teams}
                />
              </ContextMenu>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface AddFrameProps {
  index: number;
  team: Team;
  router: AppRouterInstance;
}

export const AddFrame = ({ index, router, team }: AddFrameProps) => {
  return (
    <motion.div key={index} className="flex-1 basis-[calc((100%-20px)/6)] ">
      <div
        className={`w-full border rounded-lg flex items-center justify-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors`}
        onClick={() => router.push(`/teams/${team.id}`)}
      >
        <div className="flex gap-2 justify-center p-2">
          <Plus className="h-5 w-5 text-stone-500" />
          <span className="text-sm">Add pokemon</span>
        </div>
      </div>
    </motion.div>
  );
};
