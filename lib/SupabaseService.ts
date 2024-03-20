import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getEnv } from "./EnvLoaderService.ts";

async function initSupabase() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = await getEnv();
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getClient() {
  // Create a single supabase client for interacting with your database
  try {
    return await initSupabase();
  } catch (error) {
    console.log(error);
    return null;
  }

  //
  //aws-0-us-west-1.pooler.supabase.com
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZ3pjZ2tjd3BxbGt5b3J6anFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTk3MTcsImV4cCI6MjAyMjEzNTcxN30.ImWmpvtyX0QogKj0F4IraJSxeHvuC2XnJyOirqy1mvo
}
