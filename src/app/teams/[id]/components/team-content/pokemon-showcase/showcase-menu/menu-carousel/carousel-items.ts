import {
  Sliders,
  Leaf,
  Zap,
  Package,
  Star,
  Info,
  LucideIcon,
  Swords,
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
    name: "EVs & IVs",
    icon: Sliders,
  },
  {
    name: "Nature",
    icon: Leaf,
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
