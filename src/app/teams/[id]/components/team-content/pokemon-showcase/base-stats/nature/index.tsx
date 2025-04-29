"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, ArrowDown } from "lucide-react";

export const Nature = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"Choose nature"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nature</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="w-full flex gap-2 text-muted-foreground items-center justify-center">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">Positive</span>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2 text-muted-foreground items-center justify-center">
              <ArrowDown className="w-4 h-4" />
              <span className="text-sm inline-block [writing-mode:vertical-lr]">
                Negative
              </span>
            </div>
            <div className="w-full flex flex-col">
              <div className="flex justify-between w-full">
                <div className="w-full h-10 flex justify-center items-center border-b" />
                <span className="w-full h-10 flex justify-center items-center border-b border-l">
                  Atk
                </span>
                <span className="w-full h-10 flex justify-center items-center border-b">
                  Def
                </span>
                <span className="w-full h-10 flex justify-center items-center border-b">
                  Sp.Atk
                </span>
                <span className="w-full h-10 flex justify-center items-center border-b">
                  Sp.Def
                </span>
                <span className="w-full h-10 flex justify-center items-center border-b">
                  Speed
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="w-full h-10 flex justify-center items-center">
                  Atk
                </span>
                <span className="w-full h-10 flex justify-center items-center border-l">
                  Hardy
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Bold
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Modest
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Calm
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Timid
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="w-full h-10 flex justify-center items-center">
                  Def
                </span>
                <span className="w-full h-10 flex justify-center items-center border-l">
                  Lonely
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Docile
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Mild
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Gentle
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Hasty
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="w-full h-10 flex justify-center items-center">
                  Sp.Atk
                </span>
                <span className="w-full h-10 flex justify-center items-center border-l">
                  Adamant
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Impish
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Bashful
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Careful
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Jolly
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="w-full h-10 flex justify-center items-center">
                  Sp.Def
                </span>
                <span className="w-full h-10 flex justify-center items-center border-l">
                  Naughty
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Lax
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Rash
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Quirky
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Naive
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="w-full h-10 flex justify-center items-center">
                  Speed
                </span>
                <span className="w-full h-10 flex justify-center items-center border-l">
                  Brave
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Relaxed
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Quiet
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Sassy
                </span>
                <span className="w-full h-10 flex justify-center items-center">
                  Serious
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
