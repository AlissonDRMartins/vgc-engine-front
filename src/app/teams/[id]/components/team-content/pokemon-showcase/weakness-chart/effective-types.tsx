"use client";

import { analyzePokemon, TypeEffectEntry } from "@/utils/type-analysis";
import { PokemonTypeItem } from "@/components/pokemon/type";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { InfiniteCarousel } from "@/components/infinite-carousel";

export const EffectiveTypes = () => {
  const { pokemonSelected } = useTeamContext();
  const filteredMoves =
    pokemonSelected?.moves.filter((move) => move.power > 0) || [];
  const analyzedTypes = analyzePokemon({
    pokemonTypes: pokemonSelected?.types || [],
    moves:
      filteredMoves.map((move) => ({
        name: move.name,
        type: move.type,
        power: move.power,
      })) || [],
    item: {
      name: pokemonSelected?.item || "",
    },
  });

  return (
    <div className="flex flex-col justify-center gap-2 w-full px-6 mt-6 md:mt-0 lg:h-[210px]">
      <span className="font-bold text-muted-foreground text-sm">
        Effective Types
      </span>
      <div className="flex flex-col w-full gap-2">
        <TypeItem
          key={`weaknesses-${JSON.stringify(analyzedTypes.types.weakTo)}`}
          title="Weaknesses"
          itemList={analyzedTypes.types.weakTo}
        />
        <TypeItem
          key={`resistances-${JSON.stringify(analyzedTypes.types.resistantTo)}`}
          title="Resistances"
          itemList={analyzedTypes.types.resistantTo}
        />
        <TypeItem
          key={`immunities-${JSON.stringify(analyzedTypes.types.immuneTo)}`}
          title="Immunities"
          itemList={analyzedTypes.types.immuneTo}
        />
      </div>
    </div>
  );
};

const TypeItem = ({
  title,
  itemList,
}: {
  title: string;
  itemList: TypeEffectEntry[];
}) => {
  return (
    <div className="w-full bg-gradient-to-br from-white to-stone-50 dark:from-stone-100 dark:to-stone-200 text-black p-1 h-[30px] overflow-hidden relative flex items-center rounded-full">
      <div className="z-10 flex w-full items-center">
        <div className="flex justify-center w-[35%]">
          <span className="text-sm text-white">{title}:</span>
        </div>
        <div className="flex justify-center gap-2 w-[65%]">
          {itemList.length === 0 ? (
            <span className="text-sm italic text-muted-foreground">None</span>
          ) : (
            <InfiniteCarousel speed={0.2}>
              {itemList.map(({ type, value }, index) => {
                return (
                  <div
                    key={String(type) + index}
                    className="flex items-center gap-1 py-1 rounded-md"
                  >
                    <div className="w-[32px] h-[32px]">
                      <PokemonTypeItem pokemonType={[String(type)]} />
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">
                      x{value}
                    </span>
                  </div>
                );
              })}
            </InfiniteCarousel>
          )}
        </div>
      </div>
      <div
        className="bg-black h-full w-[35%] absolute left-0"
        style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
};
