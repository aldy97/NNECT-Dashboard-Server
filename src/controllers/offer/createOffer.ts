import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { IOffer, Offer, OfferDocument } from '../../models/Offer';
import { MESSAGES } from '../../utils/constants';
import consola from 'consola';

export default async (req: Request, res: Response): Promise<void> => {
    const {
        title,
        restaurantID,
        description,
        available,
        startDate,
        endDate,
        startTime,
        endTime,
        repeat,
        maxPeople,
    }: OfferDocument = req.body;

    if (!title) {
        res.send({ message: MESSAGES.EMPTY_OFFER_NAME });
        return;
    }

    if (!restaurantID) {
        res.send({ message: MESSAGES.EMPTY_NAME });
        return;
    }

    if (!maxPeople) {
        res.send({ message: MESSAGES.MAX_PEOPLE_EMPTY });
        return;
    }

    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.exists({ _id: restaurantID });
    } catch (e) {
        consola.error(e);
        res.send({ message: MESSAGES.USER_NOT_EXIST });
    }
    if (!restaurantExists) {
        res.send({ message: MESSAGES.USER_NOT_EXIST });
        return;
    }

    if (!description) {
        res.send({ message: MESSAGES.EMPTY_OFFER_DESC });
        return;
    }

    if (!startDate) {
        res.send({ message: MESSAGES.START_DATE_UNDEFINED });
        return;
    }

    if (endDate === undefined && repeat !== 'Never') {
        res.send({ message: MESSAGES.END_DATE_UDEFINED });
        return;
    }

    if (available === undefined) {
        res.send({ message: MESSAGES.OFFER_AVAL_UNDIFINED });
        return;
    }

    const offerInfo: IOffer = {
        title,
        restaurantID,
        description,
        available,
        startDate,
        endDate,
        startTime,
        endTime,
        repeat,
        maxPeople,
    };

    try {
        const newOffer: OfferDocument = await new Offer(offerInfo).save();
        await Restaurant.updateOne(
            { _id: restaurantID },
            { $push: { offers: newOffer._id } }
        );
        res.status(201).send({ newOffer });
    } catch (e) {
        consola.error(e);
        res.status(500).send(MESSAGES.UNEXPECTED_ERROR);
    }
};
