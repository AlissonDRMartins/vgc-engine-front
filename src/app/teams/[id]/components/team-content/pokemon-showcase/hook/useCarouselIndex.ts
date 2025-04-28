import { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export const useCarouselIndex = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentIndex(index);
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  return {
    carouselApi,
    setCarouselApi,
    currentIndex,
    setCurrentIndex,
  };
};
