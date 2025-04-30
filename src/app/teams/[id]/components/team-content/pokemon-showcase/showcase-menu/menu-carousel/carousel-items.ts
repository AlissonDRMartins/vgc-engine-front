import {
  Zap,
  Package,
  Star,
  Info,
  LucideIcon,
  Swords,
  Dumbbell,
  Boxes,
} from "lucide-react";

export type CarouselItem = {
  name: string;
  icon: LucideIcon;
};

export const carouselItems: CarouselItem[] = [
  {
    name: "Moves",
    icon: Swords,
  },
  {
    name: "Training",
    icon: Dumbbell,
  },
  {
    name: "Abilities & Items",
    icon: Boxes,
  },
  {
    name: "Ability",
    icon: Zap,
  },
  {
    name: "Item",
    icon: Package,
  },
  {
    name: "Tera Type",
    icon: Star,
  },
  {
    name: "Summary",
    icon: Info,
  },
];
