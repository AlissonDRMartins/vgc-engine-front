import Image from "next/image";

export const DarumakaLoading = () => {
  return (
    <div className="p-4 flex flex-col gap-2 w-full items-center justify-center h-[calc(100vh-4rem)]">
      <Image
        src={"/gifs/darumaka-galar.gif"}
        alt="Loading"
        width={200}
        height={200}
        unoptimized
        className="object-contain"
      />
      <span className="text-2xl font-bold">Loading...</span>
    </div>
  );
};
