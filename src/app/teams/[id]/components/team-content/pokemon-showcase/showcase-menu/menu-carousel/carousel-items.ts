import {
  Star,
  Info,
  LucideIcon,
  Swords,
  Dumbbell,
  Boxes,
  ShieldOff,
  DraftingCompass,
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
    name: "Vulnerability",
    icon: ShieldOff,
  },
  {
    name: "Poke Analysis",
    icon: DraftingCompass,
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
