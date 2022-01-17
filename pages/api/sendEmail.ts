import type { NextApiRequest, NextApiResponse } from 'next'
import { SMTPClient, Message } from 'emailjs'

const WEBSITE_MAIL_ADDRESS : string | undefined= process.env.NEXT_PUBLIC_MAIL_ADDRESS 
const WEBSITE_MAIL_PASSWORD : string | undefined  = process.env.NEXT_PUBLIC_MAIL_PASSWORD
const MAIL_HOST : string | undefined = process.env.NEXT_PUBLIC_MAIL_HOST

const client = new SMTPClient({
   user: WEBSITE_MAIL_ADDRESS,
   password: WEBSITE_MAIL_PASSWORD,
   host: MAIL_HOST,
   ssl: true
 })

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
      email: string;
      subject: string;
      text: string;
  };
}

export default async (req: ExtendedNextApiRequest, res: NextApiResponse) => {

  const {email, subject, text} = req.body

  try {
    if (typeof email !== 'string' ||
        typeof subject !== 'string' ||
        typeof text !== 'string') {
          throw new Error("Email, subject or text is not set.")
    }

    const mail = {
      text: text,
      from: email,
      to: WEBSITE_MAIL_ADDRESS,
      subject: subject,
    } as unknown as Message

    const result = await client.sendAsync(mail)
    console.log(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Mail not sent.', error: err })
    return
  }
  res.status(200).json({ message: 'Mail successfully sent.' })
}