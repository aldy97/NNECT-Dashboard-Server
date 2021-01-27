import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';
import moment from 'moment';
import validator from 'validator';

export default async (req: Request, res: Response): Promise<void> => {
    const {
        _id,
        updatedFields,
    }: { _id: string; updatedFields: RestaurantDocument } = req.body;
    const { email, phoneNumber, name } = updatedFields;

    if (!_id) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
        return;
    }

    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.exists({ _id });
    } catch (err) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
    }
    if (!restaurantExists) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
        return;
    }

    if (!name) {
        res.send({ message: MESSAGES.EMPTY_NAME });
        return;
    }

    if (!email) {
        res.send({ message: MESSAGES.EMPTY_EMAIL });
        return;
    }

    if (email && !validator.isEmail(email)) {
        res.send({ message: MESSAGES.INVALID_EMAIL });
        return;
    }

    if (!phoneNumber) {
        res.send({ message: MESSAGES.EMPTY_PHONE_NUMBER });
        return;
    }

    const newRestaurant: RestaurantDocument = await Restaurant.findOneAndUpdate(
        {
            _id,
        },
        { ...updatedFields, updatedOn: moment().format('LLL') },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).send({ newRestaurant });
};
