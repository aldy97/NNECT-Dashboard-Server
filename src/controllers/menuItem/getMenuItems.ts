import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    // _id is restaurant ID
    const { _id } = req.body;

    if (!_id) {
        res.send({ message: MESSAGES.EMPTY_ID });
        return;
    }

    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.findById(_id);
    } catch (error) {
        res.send({
            message: MESSAGES.USER_NOT_EXIST,
        });
    }

    if (!restaurantExists) {
        res.send({
            message: MESSAGES.USER_NOT_EXIST,
        });
        return;
    }

    const restaurant: RestaurantDocument = await Restaurant.findById(_id).populate(
        'menu'
    );

    res.send({ status: 200, menu: restaurant.menu });
};
