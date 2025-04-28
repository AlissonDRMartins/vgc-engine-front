import { CardContent } from "@/components/ui/card";
import { TeamList } from "./team-list";
import { PokemonShowcase } from "./pokemon-showcase";

export const TeamContent = () => {
  return (
    <CardContent>
      <div className="flex flex-col md:flex-row gap-4">
        <TeamList />
        <PokemonShowcase />
      </div>
    </CardContent>
  );
};
