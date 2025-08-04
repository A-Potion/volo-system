import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { nextCookies } from 'better-auth/next-js'
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { magicLink } from 'better-auth/plugins'
import '@/envConfig.ts' 
import { transporter } from "@/lib/mailtransporter";
import { MagicMail } from "@/react-email-starter/emails/magicLink";
import { render, pretty } from '@react-email/render'

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
 
export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
                try {
                    console.log('email')
                    const info = await transporter.sendMail({
                    from: '"Volo System" <volosystem@purelymail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Your (very) magic link!", // Subject line
                    text: await render(<MagicMail url={url} />, {
                      plainText: true,
                    }),
                    html: await render(<MagicMail url={url}/>)
                    });

                    console.log("Message sent: %s", info.messageId);
                     } catch (err) {
                    console.error("Error while sending mail", err);
                }
      }
    }),
    nextCookies()]
});