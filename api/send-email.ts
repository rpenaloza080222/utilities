import { RouterContext } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";

export const sendEmail = async (
  context: RouterContext<
    "/send-email",
    Record<string | number, string | undefined>,
    Record<string, any>
  >
) => {
 
  
  const body = await context.request.body().value;
  console.log(body);
  const { to, message = "", subject } = body;
  try {
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: "sendemailrpenaloza",
          password: "cxrt gsvq hycx xhjj",
        },
      },
    });

    await client.send({
      from: "sendemailrpenaloza@gmail.com",
      to,
      subject,
      content: "...",
      html: `<p>${message}</p>`,
    });

    await client.close();
    return true;
  } catch (e) {
    console.log(e);
    return false;
    // return context.response.body = `${e.message}`
  }
};
