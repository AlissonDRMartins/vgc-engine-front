import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PokemonInfoApi } from "@/types/poke-api";
import { PokemonInfo } from "@/types/pokemon";
import { ChevronsUpDown } from "lucide-react";

interface MovesSelectedProps {
  pokedata: PokemonInfoApi | null;
  pokemonSelected: PokemonInfo | null;
  updateMember: (index: number, pokemon: PokemonInfo) => void;
}

export const MovesSelected = ({
  pokedata,
  updateMember,
  pokemonSelected,
}: MovesSelectedProps) => {
  const moves =
    pokedata?.moves
      .slice()
      .sort((a, b) => a.move.name.localeCompare(b.move.name))
      .map((move) => move.move.name) || [];

  const handleMoveSelect = (index: number, move: string) => {
    if (!pokemonSelected) return;

    const updatedMoves = [...pokemonSelected.moves];
    updatedMoves[index] = move;

    const updatedPokemon = { ...pokemonSelected, moves: updatedMoves };
    updateMember(pokemonSelected.indexTeam, updatedPokemon);
  };

  return (
    <div className="flex flex-col gap-2">
      <span>Moves:</span>
      {Array.from({ length: 4 }, (_, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-72 justify-between"
            >
              {formatMoveName(pokemonSelected?.moves[index] || "Select move")}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px]">
            <Command>
              <CommandInput placeholder="Select move..." />
              <CommandList>
                <CommandEmpty>No moves found.</CommandEmpty>
                <CommandGroup>
                  {moves.map((move) => (
                    <CommandItem
                      key={move}
                      value={move}
                      onSelect={() => handleMoveSelect(index, move)}
                    >
                      <span>{formatMoveName(move)}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

function formatMoveName(move: string) {
  return move
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
