export const EvsTitles = ({ totalEvs }: { totalEvs: number }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-center items-center w-[20%]">
        <span className="text-sm truncate">Base stats</span>
      </div>
      <div className="flex justify-center items-center w-[60%]">
        <span className="text-sm text-muted-foreground truncate">
          Total EVs: {totalEvs} / 510
        </span>
      </div>
      <div className="flex justify-center items-center w-[20%]">
        <span className="text-sm">EVs</span>
      </div>
    </div>
  );
};
