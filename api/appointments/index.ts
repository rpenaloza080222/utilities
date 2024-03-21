import { handleResponse } from "../../lib/services/ResponseService.ts";
import { getClient } from "../../lib/services/SupabaseService.ts";
import { Tables } from "../../lib/enums/Tables.ts";
import { Appointment } from "../../lib/types/types.d.ts";

/**
 * Retrieves the appointments for the app.
 *
 * @returns {Promise<Response>} The response containing the list of appointments.
 */
export default async function getAppAppointments(req: Request) {
  //Obtain the app id from the url
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

  // Validate if the app exist and is enabled
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

  //
  const { data, error } = await supabase.from(Tables.APPOINTMENTS).select<
    "*",
    Appointment
  >().eq(
    "app_id",
    appId,
  );
  console.log(data, error);
  return handleResponse({
    message: "Listado de citas",
    data,
    status: 200,
  });
}
