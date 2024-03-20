const nodemailer = require('nodemailer')
import dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library'

dotenv.config({
  path: './config/.env'
})

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.SENDER_MAIL_ADDRESS}`

const sendEmail = async(to: string, url: string, subject: string, name: string) => {
  const mailBody = `
    <div>
      <p><strong>Dear ${name},</strong></p>
      <p>
        Oops! 😬 It happens to the best of us. But don't fret - we've got your back. If you've forgotten your password for Social Sphere, it's super easy to reset it. Just click the link below, and you'll be on your way to setting a new password:
      </p>
      <p>🔗 Click <a href=${url}>here</a> to reset password</p>
      <br>
      <p>Thanks for choosing Social Sphere. We hope to see you back on our website soon.</p>
      <br>
      <p>Warm regards,</p>
      <p><strong>Customer Support Team</strong></p>
      <p><strong>Social Sphere</strong></p>
    </div>
  `

  const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND)
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  try {
    const access_token = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token
      }
    })

    const mailOptions = {
      from: {
        name: 'Social Sphere',
        address: SENDER_MAIL
      },
      to,
      subject,
      html: mailBody
    }

    const result = await transport.sendMail(mailOptions)
    return result
  } catch (err: any) {
    console.log(err)
  }
}

export default sendEmail