import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";

export const IvInfoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute right-0 p-0 rounded-full h-full w-7 cursor-pointer"
          variant="ghost"
        >
          <CircleHelp />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-3">
          <DialogTitle>
            Understanding IVs and Why Specific Spreads Matter
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span>
            In Pokémon battles, IVs (Individual Values) are hidden numbers that
            affect how strong your Pokémon’s stats can be. Each stat (HP,
            Attack, Defense, Special Attack, Special Defense, and Speed) has an
            IV between
            <span className="font-bold ml-1 text-primary">0 and 31</span>. The
            higher the IV, the better that stat can be.
          </span>
          <span>
            At first, you might think &quot;I want all my Pokémon to have 31 in
            every stat!&quot; — but actually, sometimes it’s better to have
            lower IVs, depending on your strategy. Choosing the right IV spread
            helps your Pokémon perform better in battle.
          </span>
          <span>Here are some important types of IV spreads:</span>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-2xl leading-none text-primary">•</span>
              <div>
                <h3 className="font-semibold text-base text-primary">
                  Weak Attack Spread
                </h3>
                <p className="text-muted-foreground text-sm">
                  Special attackers (who don&apos;t use physical attacks)
                  usually want
                  <span className="text-primary font-bold mx-1">
                    0 Attack IVs
                  </span>
                  . This reduces the damage they take if they hit themselves in
                  confusion or get hit by moves like
                  <span className="text-primary italic mx-1">Foul Play</span>,
                  which use their own Attack stat against them.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-2xl leading-none text-primary">•</span>
              <div>
                <h3 className="font-semibold text-base text-primary">
                  Weak Slower Spread
                </h3>
                <p className="text-muted-foreground text-sm">
                  In
                  <span className="mx-1 text-primary italic">Trick Room</span>
                  teams (where slower Pokémon move first), it&apos;s good to
                  have
                  <span className="mx-1 text-primary font-bold">
                    0 Speed IVs
                  </span>
                  . This makes your Pokémon as slow as possible, so they can
                  outspeed opponents under Trick Room.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-2xl leading-none text-primary">•</span>
              <div>
                <h3 className="font-semibold text-base text-primary">
                  Max Spread
                </h3>
                <p className="text-muted-foreground text-sm">
                  Some Pokémon, like fast attackers, want
                  <span className="mx-1 text-primary font-bold">31 IVs</span>
                  in important stats like Speed or Attack. This helps them hit
                  harder and move faster than their opponents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-2xl leading-none text-primary">•</span>
              <div>
                <h3 className="font-semibold text-base text-primary">
                  Slower Spread
                </h3>
                <p className="text-muted-foreground text-sm">
                  Sometimes you don’t want to be the absolute slowest, but you
                  still want to move after certain Pokémon (for abilities like
                  <span className="ml-1 text-primary italic">Counter</span>,
                  <span className="ml-1 text-primary italic">Aftermath</span>,
                  or for smart switch-ins). In these cases, a slightly lower
                  Speed IV is better, not minimum.
                </p>
              </div>
            </div>

            <span className="flex flex-col gap-2">
              <span className="text-base font-bold text-primary">
                Why It Matters
              </span>
              Picking the right IV spread lets your Pokémon fit your battle plan
              better. Instead of &quot;one-size-fits-all&quot; stats, you
              customize your Pokémon to be faster, slower, weaker, or stronger
              in ways that give you a tactical edge.
              <span className="text-primary font-bold">
                Good IV spreads can be the difference between winning and losing
                important matches!
              </span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
