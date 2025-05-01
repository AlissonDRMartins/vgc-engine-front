import { PokemonName } from "./pokemon-name";
import { useBuilderContext } from "../context/builder-context";
import { PokemonImage } from "./pokemon-image";

export const PokemonFrame = () => {
  const { pokeData } = useBuilderContext();
  const name = pokeData?.name ?? "Not found";

  return (
    <div className="flex flex-col gap-4 col-span-4 md:col-span-2 my-4 w-full lg:w-[50%]">
      <PokemonName name={name} />
      <PokemonImage pokemonName={name} />
    </div>
  );
};
