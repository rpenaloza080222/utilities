import { RouterContext } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";
import { SendEmailType, sendEmailToOther } from "../lib/EmailService.ts";
import { ServerRequest } from "https://deno.land/std@0.58.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.103.0/io/util.ts";
import { toArrayBuffer } from "https://deno.land/std@0.212.0/streams/to_array_buffer.ts";
import { toJson } from "https://deno.land/std@0.212.0/streams/to_json.ts";
import { readJSONFromReadStream } from "../lib/ReaderService.ts";

export default async function (req: ServerRequest) {
  try {
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
