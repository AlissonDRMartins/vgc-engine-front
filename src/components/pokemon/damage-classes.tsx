"use client";

import Image, { StaticImageData } from "next/image";
import status from "@/assets/images/status.png";
import special from "@/assets/images/special.png";
import physical from "@/assets/images/physical.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export const PokemonDamageClasses = ({
  dc,
  withAnimation = false,
  className,
}: {
  dc: string;
  withAnimation?: boolean;
  className?: string | undefined;
}) => {
  return (
    <div className="flex items-center justify-center w-[36px]">
      <TooltipProvider key={dc}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {withAnimation ? (
              <MotionDiv
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.3 }}
              >
                <Image
                  src={damageClass[dc]}
                  alt={dc}
                  className={cn("w-10 h-10 object-contain", className)}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </MotionDiv>
            ) : (
              <div>
                <Image
                  src={damageClass[dc]}
                  alt={dc}
                  className={cn("w-10 h-10 object-contain", className)}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <span className="capitalize">{dc}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const damageClass: { [key: string]: StaticImageData } = {
  status,
  special,
  physical,
};
