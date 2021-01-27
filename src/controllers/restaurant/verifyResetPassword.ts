import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';

// verifies code when users request to reset the password
export default async (req: Request, res: Response): Promise<void> => {
    const { email, resetCode } = req.body;
    if (!email) {
        res.send({ message: MESSAGES.EMPTY_EMAIL });
        return;
    }

    if (!resetCode) {
        res.send({ message: MESSAGES.EMPTY_VERIFICATION_CODE });
        return;
    }

    let codeMatchWithDB: boolean;
    try {
        codeMatchWithDB = await Restaurant.exists({ email, resetCode });
    } catch (err) {
        res.send({ message: MESSAGES.WRONG_VERIFICATION_CODE });
    }

    if (!codeMatchWithDB) {
        res.send({ message: MESSAGES.WRONG_VERIFICATION_CODE });
        return;
    }

    const restaurant = await Restaurant.findOne({ email });

    res.send({ status: 200, restaurant });
};
