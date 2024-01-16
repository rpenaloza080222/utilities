import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { sendEmail } from "./api/send-email.ts";

import * as mod from "https://deno.land/std@0.212.0/dotenv/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";


mod.load()

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const router = new Router();
  const username = Deno.env.toObject()
  console.log(username)
  router.get("/", (context) => {
    context.response.body = "Hello world!";
  }).post("/send-email", async (context) => {
    const response = await sendEmail(context)
    console.log(response)
    context.response.body = {
      message: "Email Sent"
    };
  });
  const app = new Application();
  app.use(router.routes());
  app.use(oakCors()); // Enable CORS for All Routes
  app.use(router.allowedMethods());

  await app.listen({ port: 8000 });
}
