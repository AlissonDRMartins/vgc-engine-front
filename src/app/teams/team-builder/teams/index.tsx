import { TeamsList } from "./teams-list";
import { YourTeamsTitle } from "./title";

export const Teams = () => {
  return (
    <div className="flex mt-8 flex-col gap-4">
      <YourTeamsTitle />
      <TeamsList />
    </div>
  );
};
