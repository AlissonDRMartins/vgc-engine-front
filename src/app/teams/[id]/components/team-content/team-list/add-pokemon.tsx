"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PokemonInfo } from "@/types/pokemon";
import { PokeService } from "@/services/poke";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { saveSelectedPokemonIndex } from "./helper/pokemon-selected";
import { useTeamContext } from "../../../context/team-context";
import { DefaultPokemon } from "@/utils/default-pokemon";

interface AddPokemonProps {
  isLoading?: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AddPokemon = ({ isLoading, setIsLoading }: AddPokemonProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const { addMember, team, setPokemonSelected } = useTeamContext();

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await PokeService.getPokemonList(0, 1500);
      const pokemonNames = response.results.map((pokemon) => pokemon.name);
      setPokemonList(pokemonNames);
    };
    fetchPokemonList();
  }, []);

  const handleAddPokemon = async (pokemonName: string) => {
    if (!team) return;

    const alreadyExists = team.members.some(
      (member) => member.name.toLowerCase() === pokemonName.toLowerCase()
    );

    if (alreadyExists) {
      toast.warning("Pokemon already added to the team", {
        richColors: true,
        description: "Your team must contain 6 distinct pokemons",
      });
      return;
    }

    setIsLoading(true);

    const pokeInfo = await PokeService.getPokemon(pokemonName.toLowerCase());

    const selectedPokemon: PokemonInfo = DefaultPokemon({ pokeInfo, team });

    addMember(selectedPokemon);
    setPokemonSelected(selectedPokemon);
    saveSelectedPokemonIndex(team.id, team.members.length);

    setIsPopoverOpen(false);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start"
            disabled={isLoading || (team?.members?.length ?? 0) >= 6}
          >
            <PlusCircle />
            <span>Add Pokemon</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search pokemon..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {pokemonList.map((pokemon) => (
                  <CommandItem
                    key={pokemon}
                    onSelect={(pokemon) => handleAddPokemon(pokemon)}
                    className="capitalize"
                  >
                    {pokemon}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};
