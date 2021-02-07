import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export default (mailOptions: MailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error occurs: ', error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });
};
