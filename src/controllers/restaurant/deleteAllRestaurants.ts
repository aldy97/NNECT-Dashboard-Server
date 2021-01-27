import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';

export default async (req: Request, res: Response): Promise<void> => {
    await Restaurant.deleteMany({});
    res.send({ message: 'Deleted all' });
};
