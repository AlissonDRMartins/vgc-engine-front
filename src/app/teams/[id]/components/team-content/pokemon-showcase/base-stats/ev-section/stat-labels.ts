import { BaseStats } from "@/types/pokemon";

export const statLabels: { key: keyof BaseStats; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "atk", label: "ATK" },
  { key: "def", label: "DEF" },
  { key: "spatk", label: "SP.ATK" },
  { key: "spdef", label: "SP.DEF" },
  { key: "speed", label: "SPD" },
];
