import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { VgcEngineService } from "@/services/vgc-engine";
import { CounterPokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

export const useAnalysisList = () => {
  const [analysisList, setAnalysisList] = useState<CounterPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { pokemonSelected } = useTeamContext();

  useEffect(() => {
    const fetchAnalysisList = async () => {
      try {
        setIsLoading(true);
        if (!pokemonSelected) return;
        const response = await VgcEngineService.getIndividualAnalyze(
          pokemonSelected
        );
        setAnalysisList(response.pokemon_info.counter_pokemons);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisList();
  }, [pokemonSelected]);

  return { analysisList, isLoading, error };
};
