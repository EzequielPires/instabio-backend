import * as nodemailer from "nodemailer";

interface SendEmailProps {
    email: string;
    body?: string;
    title?: string;
    token: string;
}

export class NodemailerService {
    constructor() { }

    async sendEmail({ email, body, title, token }: SendEmailProps) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'email-ssl.com.br',
                auth: {
                    user: 'noreply@portalcatalao.com.br',
                    pass: 'Portaldeveloper228687535?'
                }
            })
            let info = await transporter.sendMail({
                from: 'noreply@portalcatalao.com.br',
                to: email,
                subject: title,
                text: title,
                html: body,
            })

            return {
                success: true,
                message: info.response
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}