import { CardHeader, CardTitle } from "@/components/ui/card";
import { TeamName } from "./team-name";
import { useTeamContext } from "../../context/team-context";

export const TeamHeader = () => {
  const { team, updateTeam } = useTeamContext();

  return (
    <CardHeader>
      <CardTitle className="gap-2 flex flex-col">
        <TeamName teamName={team.name} updateTeam={updateTeam} />
      </CardTitle>
    </CardHeader>
  );
};
