import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";
const RESEND_API_KEY = 're_HaViRmdu_62ghGG1ssswJobGmrNU9kTiP';


type SendEmailType = {
  from: string;
  subject: string;
  html: string;
};

export const sendEmailToOther = async ({
  from,
  subject,
  html,
}: SendEmailType): Promise<boolean> => {
  try {
    console.log("Sending email")
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
            from: to,
            to: ['roybert35@gmail.com'],
            subject: 'hello world',
            html: '<strong>it works!</strong>',
        })
    });

    if (res.ok) {
      console.log("Sent")
        const data = await res.json();
        console.log(data)
        return true
    }else{
      console.log("Not Sent")
      return false
    }
  } catch (error) {
    return false;
  }
};
