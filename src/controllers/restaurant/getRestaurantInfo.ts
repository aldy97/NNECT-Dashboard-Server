import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const _id = req.params._id;

    if (!_id) {
        res.send({ message: MESSAGES.EMPTY_ID });
        return;
    }

    let restaurant: RestaurantDocument;
    try {
        restaurant = await Restaurant.findOne({ _id });
    } catch (err) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
    }

    if (!restaurant) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
        return;
    }

    res.send({ status: 200, restaurant });
};
