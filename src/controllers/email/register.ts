import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { Register } from '../../models/Register';
import { MESSAGES } from '../../utils/constants';
import validator from 'validator';
import sendEmail from '../../utils/sendEmail';

export default async (req: Request, res: Response): Promise<void> => {
    const { email, name, phoneNumber, password, confirmPassword } = req.body;

    if (!email) {
        res.send({ message: MESSAGES.EMPTY_EMAIL });
        return;
    }

    if (!validator.isEmail(email)) {
        res.send({ message: MESSAGES.INVALID_EMAIL });
        return;
    }

    // must be unregistered with NNECT
    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.exists({ email });
    } catch (err) {
        res.send({ message: MESSAGES.USER_ALREADY_EXIST });
    }

    if (restaurantExists) {
        res.send({ message: MESSAGES.USER_ALREADY_EXIST });
        return;
    }

    if (!name) {
        res.send({ message: MESSAGES.EMPTY_NAME });
        return;
    }

    if (!phoneNumber) {
        res.send({ message: MESSAGES.EMPTY_PHONE_NUMBER });
        return;
    }

    if (password.length < 7) {
        res.send({ message: MESSAGES.PASSWORD_TOO_SHORT });
        return;
    }

    if (password !== confirmPassword) {
        res.send({ message: MESSAGES.PASSWORD_NOT_MATCH });
        return;
    }

    const registerCode = Math.floor(1000 + Math.random() * 9000);
    const register = await new Register({ email, registerCode }).save();

    const mailOptions = {
        from: `NNECT ${process.env.EMAIL}`,
        to: email,
        subject: 'Verify your email with NNECT',
        html: `<div>
                     <p>Your verification code: <strong>${registerCode}</strong></p>
                     <p>Need support? Reach out to us on <a href="mailto:support@nnect.ca">support@nnect.ca</a></p>
                   </div>`,
    };

    try {
        sendEmail(mailOptions);
        res.send({ status: 201, register });
    } catch (err) {
        res.send({ message: MESSAGES.UNEXPECTED_ERROR });
    }
};
