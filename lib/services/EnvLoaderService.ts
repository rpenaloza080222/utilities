import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";

export async function getEnv() {
  return await load();
}
