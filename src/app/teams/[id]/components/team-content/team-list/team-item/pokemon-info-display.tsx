import { PokemonTypeItem } from "@/components/pokemon/type";
import { PokemonInfo } from "@/types/pokemon";

export const PokemonInfoDisplay = ({
  pokemon,
  isSelected,
}: {
  pokemon: PokemonInfo;
  isSelected: boolean;
}) => (
  <div
    className={`flex ${
      isSelected ? "flex-col" : "justify-between items-center flex-1 ml-2"
    }`}
  >
    <span className={`capitalize ${isSelected ? "text-xl" : "text-md"}`}>
      {pokemon.name}
    </span>
    <PokemonTypeItem pokemonType={pokemon.types} />
  </div>
);
