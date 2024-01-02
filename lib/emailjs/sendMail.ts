import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

export default async function sendMail(
    serviceID: string,
    templateID: string,
    data: {[key: string]: string},
    publicKey: string
):Promise<EmailJSResponseStatus | 'error'>{
    try {
        const mailData = await emailjs.send(
            serviceID,
            templateID,
            data,
            publicKey
        )
        return mailData
    } catch (error) {
        return 'error'
    }
}