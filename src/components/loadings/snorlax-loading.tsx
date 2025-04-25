import Image from "next/image";
import snorlax from "@/assets/images/snorlax.png";

export const SnorlaxLoading = () => {
  return (
    <div className="p-4 flex flex-col gap-2 items-center">
      <Image
        src={snorlax}
        alt="Loading"
        width={200}
        height={200}
        className="animate-bounce"
      />
      <span className="text-2xl font-bold">Loading...</span>
    </div>
  );
};
