import { ZodError } from "https://deno.land/x/zod@v3.16.1/ZodError.ts";
import { z as zod } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { Appointment } from "./lib/types/types.d.ts";

const AppointmentSchema = zod.object({
  description: zod.string(),
  title: zod.string(),
  host: zod.string(),
  guest: zod.string(),
  appointment_start_date: zod.number(),
  appointment_end_date: zod.number(),
  app_id: zod.string({
    required_error: "La aplicación es requerida para esta acción",
    invalid_type_error: "La aplicación debe ser una cadena de texto",
  }).uuid(),
}).required();

type AppointmentKeys = keyof typeof AppointmentSchema.shape;

try {
  const result = AppointmentSchema.safeParse({
    title: "First appointment",
    description: "description",
    appointment_start_date: "",
    appointment_end_date: "",
    app_id: "",
  });

  if (!result.success) {
    const formatted = result.error.issues;
    const messages: Record<string, string> = {};
    for (const iterator of formatted) {
      const { path: [key], message } = iterator;
      messages[key] = message;
    }

    console.log(messages);
  }
} catch (e) {
  console.log("Error");
  console.log(e);
  //const messages: Record<string, string> = {};
  //for (const iterator of e) {
  //const { path, message } = iterator;
  //messages[path] = message;
  //}
  //console.log(messages);
}
