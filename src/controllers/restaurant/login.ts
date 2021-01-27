import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import validator from 'validator';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email) {
        res.send({ message: MESSAGES.EMPTY_EMAIL });
        return;
    }

    if (!validator.isEmail(email)) {
        res.send({ message: MESSAGES.INVALID_EMAIL });
        return;
    }

    if (!password) {
        res.send({ message: MESSAGES.EMPTY_PASSWORD });
        return;
    }

    let restaurant: RestaurantDocument | null;

    try {
        restaurant = await Restaurant.findOne({ email, password });
    } catch (err) {
        res.send({ message: MESSAGES.WRONG_CREDENTIALS });
    }

    if (!restaurant) {
        res.send({ message: MESSAGES.WRONG_CREDENTIALS });
        return;
    } else {
        res.status(201).send({ restaurant });
    }
};
