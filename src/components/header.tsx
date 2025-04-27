"use client";

import { megrim } from "@/styles/fonts";
import dynamic from "next/dynamic";

const ModeToggle = dynamic(() => import("@/components/mode-toggle/index"), {
  ssr: false,
});

const Header = () => {
  return (
    <div className="w-full flex justify-between p-2 bg-gradient-to-b from-[#bbbbbb] dark:from-[#1d1d4d] to-transparent">
      <span
        className={`text-red-500 dark:text-red-600 font-bold text-3xl ${megrim.className}`}
      >
        Catchem
        <span className="text-stone-700 dark:text-white font-bold text-3xl">
          All
        </span>
      </span>
      <ModeToggle />
    </div>
  );
};

export default Header;
