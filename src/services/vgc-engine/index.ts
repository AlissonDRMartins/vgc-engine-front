import { apiVgcEngine } from "@/lib/ky";
import { ItemDetail, MovesDetail } from "@/types/pokemon";

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

  getAllItems: async () => {
    const response = await apiVgcEngine.get(`items`);
    if (!response) throw new Error("Failed to fetch items list");
    return response.json<{ items: ItemDetail[] }>();
  },
};
