import { useCarouselIndex } from "../hook/useCarouselIndex";
import { MovesSelected } from "../moves/moves-selected";
import { MenuCarousel } from "./menu-carousel";

export const ShowcaseMenu = () => {
  const { currentIndex } = useCarouselIndex();

  return (
    <MenuCarousel>
      {currentIndex === 0 ? <MovesSelected /> : <div></div>}
    </MenuCarousel>
  );
};
