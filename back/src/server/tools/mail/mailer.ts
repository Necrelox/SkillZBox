import * as nodemailer from 'nodemailer';

export class Mailer {
    private transporter: nodemailer.Transporter;

    constructor( config: any) {
        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass
            }
        });
    }

    public send(mailOptions: nodemailer.SendMailOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}


