import { Request, Response } from 'express';
import { Offer, OfferDocument } from '../../models/Offer';
import { Restaurant } from '../../models/Restaurant';
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
        const offer: OfferDocument = await Offer.findOne({ _id });
        await Restaurant.updateOne(
            { _id: offer.restaurantID },
            { $pull: { offers: _id as any } }
        );
        await Offer.deleteOne({ _id });
        res.status(204).send({ message: MESSAGES.OFFER_DEL_SUCC });
    }
};
