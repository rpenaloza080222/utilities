import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";
const env = await load();

export function getClient() {
  // Create a single supabase client for interacting with your database
  try {
    const supabaseUrl = env["SUPABASE_URL"];
    const supabaseAnonKey = env["SUPABASE_ANON_KEY"];
    console.log(supabaseAnonKey);
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.log(error);
    return null;
  }

  //
  //aws-0-us-west-1.pooler.supabase.com
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZ3pjZ2tjd3BxbGt5b3J6anFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTk3MTcsImV4cCI6MjAyMjEzNTcxN30.ImWmpvtyX0QogKj0F4IraJSxeHvuC2XnJyOirqy1mvo
}

const supabase = getClient();
if (supabase) {
  const { data, error } = await supabase.from("apps").select(
    "id, name,  appointments (*)",
  );
  console.log(data, error);
}

console.log();
