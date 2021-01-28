import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';
import nodemailer from 'nodemailer';
import validator from 'validator';

export default async (req: Request, res: Response): Promise<void> => {
    const email = req.params.email;

    if (!email) {
        res.send({ message: MESSAGES.EMPTY_EMAIL });
        return;
    }

    if (!validator.isEmail(email)) {
        res.send({ message: MESSAGES.INVALID_EMAIL });
        return;
    }

    // only send email to those that have been registered with NNECT
    let emailRegistered: boolean;

    try {
        emailRegistered = await Restaurant.exists({ email });
    } catch (err) {
        res.send({ message: MESSAGES.EMAIL_NOT_REGISTERED });
    }

    if (!emailRegistered) {
        res.send({ message: MESSAGES.EMAIL_NOT_REGISTERED });
        return;
    }

    // Randomly-generated 4-digit for identity verification
    const resetCode = Math.floor(1000 + Math.random() * 9000);
    const restaurant: RestaurantDocument = await Restaurant.findOne({ email });
    await Restaurant.findOneAndUpdate(
        { _id: restaurant._id },
        { resetCode },
        {
            new: true,
            runValidators: true,
        }
    );

    // For gmail, go to https://myaccount.google.com/lesssecureapps, and allow less secure apps
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'support@nnect.ca',
            pass: 'Nnect2021!',
        },
    });

    const mailOptions = {
        from: `NNECT ${process.env.EMAIL}`,
        to: email,
        subject: 'Reset password for your NNECT account',
        html: `<div>
                 <p>Your verification code: <strong>${resetCode}</strong></p>
                 <p>Need support? Reach out to us on <a href="mailto:support@nnect.ca">support@nnect.ca</a></p>
               </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error occurs: ', error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });

    res.send({ status: 200, message: MESSAGES.FORGET_PASS_EMAIL_SENT_SUCC });
};
