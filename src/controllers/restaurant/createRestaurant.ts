import { Request, Response } from 'express';
import { Register } from '../../models/Register';
import {
    Restaurant,
    RestaurantDocument,
    IRestaurant,
} from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';
import md5 from '../../utils/md5';

// all fields have been checked, except for registerCode
export default async (req: Request, res: Response): Promise<void> => {
    const { name, email, phoneNumber, password, registerCode } = req.body;

    if (!registerCode) {
        res.send({ message: MESSAGES.EMPTY_VERIFICATION_CODE });
        return;
    }

    let registerCodeMatches: boolean;
    try {
        registerCodeMatches = await Register.exists({ email, registerCode });
    } catch (err) {
        res.send({ message: MESSAGES.WRONG_VERIFICATION_CODE });
    }
    if (!registerCodeMatches) {
        res.send({ message: MESSAGES.WRONG_VERIFICATION_CODE });
        return;
    }

    const restaurantInfo: IRestaurant = {
        name,
        email,
        phoneNumber,
        password: md5(password),
    };
    const newRestaurant: RestaurantDocument = await new Restaurant(
        restaurantInfo
    ).save();

    res.status(201).send({ newRestaurant });
};
