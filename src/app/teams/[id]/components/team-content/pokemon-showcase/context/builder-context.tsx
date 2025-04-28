"use client";

import { PokemonInfoApi } from "@/types/poke-api";
import { createContext, useContext } from "react";

interface BuilderContextType {
  pokeData: PokemonInfoApi | null;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: BuilderContextType;
}) => {
  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (!context)
    throw new Error("useBuilderContext must be used within a TeamProvider");

  return context;
};
