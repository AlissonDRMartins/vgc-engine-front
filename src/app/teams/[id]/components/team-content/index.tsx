import { CardContent } from "@/components/ui/card";
import { TeamList } from "./team-list";
import { PokemonShowcase } from "./pokemon-showcase";
import { MenuProvider } from "./pokemon-showcase/context/menu-context";

export const TeamContent = () => {
  return (
    <MenuProvider>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <TeamList />
          <PokemonShowcase />
        </div>
      </CardContent>
    </MenuProvider>
  );
};
