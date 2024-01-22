import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
const RESEND_API_KEY = "re_HaViRmdu_62ghGG1ssswJobGmrNU9kTiP";

export type SendEmailType = {
  from: string
  subject: string;
  to: string | string[];
  html: string;
};

const username = "sendemailrpenaloza";
const password = "cxrt gsvq hycx xhjj";

const client = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com",
    port: 465,
    tls: true,
    auth: {
      username,
      password,
    },
  },
});

export const sendEmailToOther = async ({
  from,
  to,
  subject,
  html,
}: SendEmailType): Promise<boolean | string> => {
  try {
    // const from = `${username}@gmail.com`
    console.log(from, to)
    await client.send({
      from,
      to,
      subject,
      content: html,
      html,
    });
    return true;
  } catch (_error) {
    console.log(_error)
    return _error;
  }
};
