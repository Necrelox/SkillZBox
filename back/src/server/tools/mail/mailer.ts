import * as emailTempo from "./emailTempo.json";
import * as nodemailer from 'nodemailer';
// import * as fs from "fs";


export class Mailer {

    public static emailHasBadSyntaxe(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            throw {
            code: "MailerError",
            message: "Email has bad syntax"
        };
    }

    public static emailIsTemporary(email: string) {
        if ((emailTempo['default']).includes(email.split("@")[1]))
            throw {
            code: "MailerError",
            message: "Email is mail temporary"
        };
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


