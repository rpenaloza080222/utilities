import { SendEmailType, sendEmailToOther } from "../lib/EmailService.ts";
import { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";
import { readJSONFromReadStream } from "../lib/ReaderService.ts";

export default async function (req: ServerRequest) {
  try {
    console.log("Email endpoint")
    const body = req.body as unknown as ReadableStream<SendEmailType>;

    const data = await readJSONFromReadStream<SendEmailType>(body);
    const response = await sendEmailToOther(data);

    if (typeof response === "boolean" && response) {
      return new Response(
        JSON.stringify(
          {
            status: 200,
            message: "Correo enviado con éxito",
            data: [],
          },
          null,
          2
        ),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }else{
      return new Response(
        JSON.stringify(
          {
            status: 400,
            message: `Error al enviar el correo ${response}`,
            data: [],
          },
          null,
          2
        ),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        {
          status: 500,
          message: `Error al enviar el correo ${error}`,
          data: [],
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
