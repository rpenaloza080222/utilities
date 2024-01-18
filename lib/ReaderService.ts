import { toJson } from "https://deno.land/std@0.212.0/streams/to_json.ts";

export async function readJSONFromReadStream<T>(body: ReadableStream<T>) {
    return await toJson(body) as T;
}
