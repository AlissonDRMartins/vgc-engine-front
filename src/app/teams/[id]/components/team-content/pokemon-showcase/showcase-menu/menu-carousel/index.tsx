import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";
import { useCarouselIndex } from "../../hook/useCarouselIndex";
import { carouselItems } from "./carousel-items";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuCarouselProps {
  children?: ReactNode;
}

export const MenuCarousel = ({ children }: MenuCarouselProps) => {
  const { currentIndex, setCarouselApi } = useCarouselIndex();

  return (
    <div className="w-full md:w-[50%] p-2 md:py-6 flex justify-center h-full">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-start w-full justify-center">
          <Carousel
            opts={{ loop: true }}
            setApi={setCarouselApi}
            className="w-[calc(100%-140px)]"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <CarouselItem
                    key={item.name}
                    className="basis-1/5 flex justify-center"
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Icon
                            className={`${
                              index === currentIndex
                                ? "text-red-500"
                                : "text-black dark:text-white"
                            }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{item.name}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious variant="ghost" />
            <CarouselNext variant="ghost" />
          </Carousel>
        </div>
        <div className="flex w-full justify-center">
          <span className="text-sm text-red-500">
            {carouselItems[currentIndex].name}
          </span>
        </div>
        <div className="mt-8 md:mt-0">{children}</div>
      </div>
    </div>
  );
};
