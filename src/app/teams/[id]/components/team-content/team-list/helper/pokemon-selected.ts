const TEAM_SELECTED_KEY = "team_selected_pokemon";

export const saveSelectedPokemonIndex = (teamId: string, index: number) => {
  if (typeof window === "undefined") return;
  const data = JSON.parse(localStorage.getItem(TEAM_SELECTED_KEY) || "{}");
  data[teamId] = index;
  localStorage.setItem(TEAM_SELECTED_KEY, JSON.stringify(data));
};

export const getSelectedPokemonIndex = (teamId: string): number | null => {
  if (typeof window === "undefined") return null;
  const data = JSON.parse(localStorage.getItem(TEAM_SELECTED_KEY) || "{}");
  return typeof data[teamId] === "number" ? data[teamId] : null;
};
