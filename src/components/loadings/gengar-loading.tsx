import Image from "next/image";
import gengar from "@/assets/images/gengar.png";

export const GengarLoading = () => {
  return (
    <div className="p-4 flex flex-col gap-2 w-full items-center justify-center h-[calc(100vh-4rem)]">
      <Image
        src={gengar}
        alt="Loading"
        width={200}
        height={200}
        className="animate-bounce"
      />
      <span className="text-2xl font-bold">Loading...</span>
    </div>
  );
};
