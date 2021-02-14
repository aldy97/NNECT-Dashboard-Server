import { Request, Response } from 'express';
import { Restaurant, RestaurantDocument } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurants: RestaurantDocument[] = await Restaurant.find().populate(
            'offers'
        );
        res.send(restaurants);
    } catch (err) {
        res.send({ message: MESSAGES.UNEXPECTED_ERROR });
    }
};
