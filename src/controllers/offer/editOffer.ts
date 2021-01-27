import { Request, Response } from 'express';
import { Offer, OfferDocument } from '../../models/Offer';
import { MESSAGES } from '../../utils/constants';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<void> => {
    const {
        _id,
        updatedFields,
    }: { _id: string; updatedFields: OfferDocument } = req.body;

    const { title, description, startDate } = updatedFields;

    if (!_id) {
        res.send({ message: MESSAGES.OFFER_ID_EMPTY });
        return;
    }

    let offerExists: boolean;
    try {
        offerExists = await Offer.exists({ _id });
    } catch (err) {
        res.send({ message: MESSAGES.OFFER_NOT_FOUND });
    }

    if (!offerExists) {
        res.send({ message: MESSAGES.OFFER_NOT_FOUND });
        return;
    }

    if (!title) {
        res.send({ message: MESSAGES.OFFER_TITLE_EMPTY });
        return;
    }

    if (!description) {
        res.send({ message: MESSAGES.OFFER_DESC_EMPTY });
        return;
    }

    if (!startDate) {
        res.send({ message: MESSAGES.START_DATE_UNDEFINED });
        return;
    }

    const modifiedUpdatedFields = {
        ...updatedFields,
        updatedOn: moment().format('LLL'),
    };

    await Offer.findOneAndUpdate({ _id }, modifiedUpdatedFields, {
        new: true,
        runValidators: true,
    });

    res.send({ status: 200, message: MESSAGES.OFFER_EDIT_SUCC });
};
