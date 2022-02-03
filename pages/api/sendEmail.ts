/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next'
import sendinblueRegisterNewsLetter from '../../utils/sendinblueRegisterNewsLetter' 
import { IEmail } from '../../typings'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {name, email, subject, message } = (JSON.parse(req.body as string) as IEmail)
    // const sendSmtpEmail = {
    //     to: [{
    //         email: 'henrybergstrom@protonmail.com' 
    //     }],
    //     params: {
    //       name: 'Malith',
    //       subject: 'This is a message',
    //       text: msg,
    //   },
    // };

    const emailtoRegister = email
    sendinblueRegisterNewsLetter(emailtoRegister)
    res.status(200).send('success');
  }