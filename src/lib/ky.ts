import ky from "ky";
import { env } from "../constants/env.mjs";

export const apiPoke = ky.create({
  prefixUrl: env.NEXT_PUBLIC_POKE_API_URL,
  timeout: 180000,
});

export const apiVgcEngine = ky.create({
  prefixUrl: env.NEXT_PUBLIC_VGC_ENGINE_API_URL,
  timeout: 180000,
});
