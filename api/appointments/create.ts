import { handleResponse } from "../../lib/ResponseService.ts";
import { Tables } from "../../lib/enums/Tables.ts";
import { getClient } from "../../main.ts";
import { Appointment } from "../../lib/types/types.d.ts";

export default async function createAppAppointment(req: Request) {
  // Validate if the app exist and is enabled
  const u = new URL(req.url);
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

  const { error } = await supabase
    .from(Tables.APPOINTMENTS)
    .insert({
      title: "First appointment",
      description: "description",
      appointment_start_date: "",
      appointment_end_date: "",
      app_id: appId,
    });

  if (error) {
    return handleResponse({
      message: error.message,
      data: [],
      status: 500,
    });
  }

  return handleResponse({
    message: "Cita creada",
    data: [],
    status: 500,
  });
}
