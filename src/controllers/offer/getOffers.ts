import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    // _id is restaurant ID
    const _id = req.params._id;
    if (!_id) {
        res.send({ meesage: MESSAGES.EMPTY_ID });
    }

    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.exists({ _id });
    } catch (e) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
    }
    if (!restaurantExists) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
    }

    const restaurant: RestaurantDocument = await Restaurant.findById(_id).populate(
        'offers'
    );

    res.status(200).send({ offers: restaurant.offers });
};
