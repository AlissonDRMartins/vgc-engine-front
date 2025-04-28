"use client";

import { CarouselApi } from "@/components/ui/carousel";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface MenuContextType {
  carouselApi?: CarouselApi;
  setCarouselApi: (api: CarouselApi) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <MenuContext.Provider
      value={{ carouselApi, setCarouselApi, currentIndex, setCurrentIndex }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
