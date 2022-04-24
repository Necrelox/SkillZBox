import * as nodemailer from 'nodemailer';

export class Mailer {

    // @ts-ignore
    public static checkEmailSyntaxe(_email: string): boolean {

    }

    // @ts-ignore
    public static checkIfEmailIsTemporary(_email: string): boolean {

    }

    // @ts-ignore
    public static checkIfEmailExists(_email: string): boolean {

    }

    public static sendMail(mailOptions: nodemailer.SendMailOptions) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env['EMAIL_AUTH_USER'],
                pass: process.env['EMAIL_AUTH_PASSWORD']
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}


