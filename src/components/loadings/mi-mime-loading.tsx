import Image from "next/image";

export const MrMimeLoading = () => {
  return (
    <div className="p-4 flex flex-col gap-2 items-center">
      <Image
        src={"/gifs/mr-mime.gif"}
        unoptimized
        priority
        alt="Loading"
        width={200}
        height={200}
        rel="preload"
      />
      <span className="text-2xl font-bold">Loading...</span>
    </div>
  );
};
