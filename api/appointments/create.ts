import { handleResponse } from "../../lib/services/ResponseService.ts";
import { Tables } from "../../lib/enums/Tables.ts";
import { getClient } from "../../lib/services/SupabaseService.ts";
import { z as zod } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { validateZodSchema } from "../../lib/services/ZodValidatorService.ts";
import { readJSONFromReadStream } from "../../lib/services/ReaderService.ts";

const AppointmentSchema = zod.object({
  description: zod.string().min(1),
  title: zod.string().min(2),
  host: zod.string().email(),
  guest: zod.string().email(),
  appointment_start_date: zod.number(),
  appointment_end_date: zod.number(),
}).required().passthrough();

export default async function createAppAppointment(req: Request) {
  try {
    // Validate if the app exist and is enabled
    const u = new URL(req.url);
    console.log(req.body);
    const body = req.body as unknown as ReadableStream<
      zod.infer<typeof AppointmentSchema>
    >;

    console.log(body);

    if (!body) {
      return handleResponse({
        message: "Manda algo pelao",
        status: 400,
        data: [],
      });
    }
    const data = await readJSONFromReadStream<
      zod.infer<typeof AppointmentSchema>
    >(body);
    const appId = u.searchParams.get("app_id");

    // Get the supabase client
    const supabase = await getClient();
    if (!supabase) {
      return handleResponse({
        message: "No se pudo acceder a la base de datos",
        data: [],
        status: 400,
      });
    }

    const { data: app } = await supabase.from(Tables.APPS).select()
      .eq(
        "id",
        appId,
      ).limit(1).single();
    if (!app) {
      return handleResponse({
        message: "Debe proporcionar la app id",
        data: [],
        status: 400,
      });
    }

    //Validate if the app is enabled
    if (!app.enabled) {
      return handleResponse({
        message: "La app no está habilitada para ver las citas",
        data: [],
        status: 400,
      });
    }

    const validation = validateZodSchema(AppointmentSchema, data);

    if (!validation.success) {
      if (validation.messages) {
        console.log("Messages", validation.messages);
        const message =
          validation.messages[Object.keys(validation.messages)[0]];
        return handleResponse({
          message,
          status: 400,
          data: [],
        });
      }
    }

    const { error } = await supabase
      .from(Tables.APPOINTMENTS)
      .insert({
        ...data,
        app_id: appId,
      });

    if (error) {
      console.log("Error Appointment", supabase);
      return handleResponse({
        message: error.message,
        data: [],
        status: 500,
      });
    }

    return handleResponse({
      message: "Cita creada",
      data: [],
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return handleResponse({
      message: error.message,
      data: [],
      status: 500,
    });
  }
}
