import { Request, Response } from 'express';
import { Offer } from '../../models/Offer';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const _id = req.params._id;

    if (!_id) {
        res.send({ message: MESSAGES.OFFER_ID_EMPTY });
        return;
    }

    let offerExists: boolean;
    try {
        offerExists = await Offer.exists({ _id });
    } catch (error) {
        res.send({ message: MESSAGES.OFFER_NOT_FOUND });
    }

    if (!offerExists) {
        res.send({ meesage: MESSAGES.OFFER_NOT_FOUND });
    } else {
        await Offer.deleteOne({ _id });
        res.status(204).send({ message: MESSAGES.OFFER_DEL_SUCC });
    }
};
