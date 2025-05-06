import { TotalStatsChart } from "../base-stats/stats-chart";
import { useMenuContext } from "../context/menu-context";
import { ItemAbilitySelected } from "../items-abilities/item-ability-selected";
import { MovesSelected } from "../moves/moves-selected";
import { EffectiveTypes } from "../weakness-chart/effective-types";
import { MenuCarousel } from "./menu-carousel";

export const ShowcaseMenu = () => {
  const { currentIndex } = useMenuContext();

  return (
    <MenuCarousel>
      {currentIndex === 0 ? (
        <MovesSelected />
      ) : currentIndex === 1 ? (
        <TotalStatsChart />
      ) : currentIndex === 2 ? (
        <ItemAbilitySelected />
      ) : currentIndex === 3 ? (
        <EffectiveTypes />
      ) : (
        <div></div>
      )}
    </MenuCarousel>
  );
};
