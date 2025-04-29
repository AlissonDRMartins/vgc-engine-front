import { EvSection } from "./ev-section";
import { IvsSection } from "./iv-section";
import { Nature } from "./nature";

export const StatsModifier = () => {
  return (
    <div className="-mt-6 mb-2 mx-2 md:mt-0 border rounded-md border-stone-200 dark:border-stone-900">
      <div className="w-full flex items-center justify-between bg-stone-200 dark:bg-stone-900 text-black dark:text-white p-2 rounded-md">
        <span>Training place</span>
        <Nature />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <EvSection />
        <IvsSection />
      </div>
    </div>
  );
};
