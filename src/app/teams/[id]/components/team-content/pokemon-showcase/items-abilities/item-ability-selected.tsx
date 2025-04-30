import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { ItemNameCell } from "./items-list/columns";

export const ItemAbilitySelected = () => {
  const { pokemonSelected } = useTeamContext();

  return (
    <div className="flex flex-col gap-2 mt-6 md:mt-0 md:h-[210px] justify-center items-end">
      <div
        className="bg-stone-200 dark:text-black flex gap-6 p-1 px-6 items-center relative overflow-hidden w-[90%] h-[40px] text-sm lg:text-base"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%)",
        }}
      >
        <span className="z-10 text-white w-[80px]">Held Item:</span>
        <div
          className={`${!pokemonSelected?.item ? "text-muted-foreground" : ""}`}
        >
          <ItemNameCell name={pokemonSelected?.item || "Not selected"} />
        </div>
        <div
          className="absolute left-0 w-[120px] h-full bg-black"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
      <div
        className="bg-stone-200 dark:text-black flex gap-9 p-1 px-6 items-center relative overflow-hidden w-[85%] h-[40px] text-sm lg:text-base"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%)",
        }}
      >
        <span className="z-10 flex justify-center text-white w-[70px]">
          Ability:
        </span>
        <span
          className={`${
            !pokemonSelected?.ability ? "text-muted-foreground" : ""
          }`}
        >
          {pokemonSelected?.ability || "Not selected"}
        </span>
        <div
          className="absolute left-0 w-[120px] h-full bg-black"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  );
};
