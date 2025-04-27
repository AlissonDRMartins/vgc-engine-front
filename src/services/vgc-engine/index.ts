import { apiVgcEngine } from "@/lib/ky";
import { MovesDetail } from "@/types/pokemon";

export const VgcEngineService = {
  getMoveDetails: async (moveList: string[]) => {
    const response = await apiVgcEngine.post(`moves_details`, {
      json: {
        moves: moveList,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch moves details list");
    return response.json<{ moves: MovesDetail[] }>();
  },
};
