import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { IReservation, Reservation } from '../../models/Reservation';
import { Offer } from '../../models/Offer';
import { MESSAGES } from '../../utils/constants';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<void> => {
    const {
        eventName,
        time,
        numberOfPeople,
        organizerName,
        organizerNumber,
        restaurant,
        offerApplied,
    }: IReservation = req.body;

    if (!time) {
        res.status(400).send({ message: MESSAGES.TIME_NOT_PROVIDED });
        return;
    }

    if (!moment(time).isValid) {
        res.status(400).send({ message: MESSAGES.INVALID_TIME });
        return;
    }

    const currTime = moment();
    if (currTime.isAfter(moment(time))) {
        res.status(400).send({ message: MESSAGES.TIME_IS_PAST });
        return;
    }

    if (numberOfPeople === undefined || numberOfPeople === null) {
        res.status(400).send({ message: MESSAGES.NUMBER_OF_PEOPLE_UNDEFIND });
        return;
    }

    if (isNaN(numberOfPeople)) {
        res.status(400).send({ message: MESSAGES.NUMBER_OF_PEOPLE_NOT_NUMBER });
        return;
    }

    if (numberOfPeople <= 0) {
        res.status(400).send({ message: MESSAGES.NUMBER_OF_PEOPLE_INVALID });
        return;
    }

    if (!organizerName) {
        res.status(400).send({ message: MESSAGES.ORGANIZER_NAME_NOT_PROVIDED });
        return;
    }

    if (!organizerNumber) {
        res.status(400).send({ message: MESSAGES.ORGANIZER_NUMBER_NOT_PROVIDED });
        return;
    }

    const restaurantExists: boolean = await Restaurant.exists({ _id: restaurant });
    if (!restaurantExists) {
        res.status(404).send({ message: MESSAGES.USER_NOT_EXIST });
        return;
    }

    const isLegalOffer = await Offer.exists({
        _id: offerApplied,
        restaurantID: restaurant,
    });
    if (!isLegalOffer) {
        res.send(400).send({ message: MESSAGES.INVALID_OFFER });
        return;
    }

    const reservationInfo: IReservation = req.body;
    const reservation = await new Reservation(reservationInfo).save();
    await Restaurant;
};
