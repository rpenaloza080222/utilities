import { RouterContext } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";
import { sendEmailToOther } from "../lib/EmailService.ts";

export const sendEmail = async (
  context: RouterContext<
    "/send-email",
    Record<string | number, string | undefined>,
    Record<string, any>
  >
) => {
  const body = await context.request.body().value
  const { to, message = "", subject } = body;
  try {
    await sendEmailToOther({
      from: to,
      to: "roybert35@gmail.com",
      subject,
      content: "...",
      html: `<p>${message}</p>`,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
    // return context.response.body = `${e.message}`
  }
};
