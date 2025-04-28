import { useMenuContext } from "../context/menu-context";
import { MovesSelected } from "../moves/moves-selected";
import { MenuCarousel } from "./menu-carousel";

export const ShowcaseMenu = () => {
  const { currentIndex } = useMenuContext();

  return (
    <MenuCarousel>
      {currentIndex === 0 ? <MovesSelected /> : <div></div>}
    </MenuCarousel>
  );
};
