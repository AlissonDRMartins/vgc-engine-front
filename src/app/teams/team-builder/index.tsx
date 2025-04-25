import { Teams } from "./teams";
import { TeamBuilderTitle } from "./title";

export const TeamBuilder = () => {
  return (
    <div className="flex p-4 w-full">
      <div className="flex flex-col w-full">
        <TeamBuilderTitle />
        <Teams />
      </div>
    </div>
  );
};

export default TeamBuilder;
