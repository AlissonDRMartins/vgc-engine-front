import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BaseStats } from "@/types/pokemon";
import { natureModifiers } from "@/utils/nature";
import { roundStat } from "@/utils/round-stat";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

export const TotalStatsChart = () => {
  const { pokemonSelected } = useTeamContext();
  const { baseStats, evs, ivs, lvl, nature } = pokemonSelected || {};

  const hp =
    ((2 * (baseStats?.hp || 0) + (ivs?.hp || 0) + (evs?.hp || 0) / 4) *
      (lvl || 0)) /
      100 +
    (lvl || 0) +
    10;

  const calcOthers = ({ stats }: { stats: keyof BaseStats }) => {
    const base =
      ((2 * (baseStats?.[stats] || 0) +
        (ivs?.[stats] || 0) +
        (evs?.[stats] || 0) / 4) *
        (lvl || 0)) /
        100 +
      5;

    if (!nature) return base;
    const modifier = natureModifiers[nature];
    if (!modifier) return base;
    if (modifier.up === stats) return base * 1.1;
    if (modifier.down === stats) return base * 0.9;
    return base;
  };

  const chartData = [
    { stats: "HP", value: roundStat(hp) },
    { stats: "ATK", value: roundStat(calcOthers({ stats: "atk" })) },
    { stats: "DEF", value: roundStat(calcOthers({ stats: "def" })) },
    { stats: "SPEED", value: roundStat(calcOthers({ stats: "speed" })) },
    { stats: "SP.DEF", value: roundStat(calcOthers({ stats: "spdef" })) },
    { stats: "SP.ATK", value: roundStat(calcOthers({ stats: "spatk" })) },
  ];

  const chartConfig = {
    value: {
      label: "value",
      color: "oklch(58.8% 0.158 241.966)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[270px] md:max-h-[253px]"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis
          dataKey="stats"
          tick={({ payload, x, y, textAnchor }) => {
            const { value } = payload;
            const statValue =
              chartData.find((d) => d.stats === value)?.value ?? "";
            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  textAnchor={textAnchor}
                  dy={-4}
                  className="fill-black dark:fill-white text-[10px]"
                >
                  {value}
                </text>
                <text
                  textAnchor={textAnchor}
                  dy={10}
                  className="fill-gray-400  text-[10px]"
                >
                  {statValue}
                </text>
              </g>
            );
          }}
        />

        <PolarGrid />
        <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
};
