import mongoose from 'mongoose';
import db from '../db/db.config';
import { OfferDocument } from './Offer';
import { RestaurantDocument } from './Restaurant';
import moment from 'moment';

const instance = db.instance;

export interface IReservation {
    eventName?: string;
    time: string;
    numberOfPeople: number;
    organizerName: string;
    organizerNumber: string;
    restaurant: RestaurantDocument['_id'];
    offerApplied: OfferDocument['_id'] | null;
    timeCreated?: string;
    timeUpdated?: string;
}

export type ReservationDocument = mongoose.Document & IReservation;

const reservationSchema = new instance.Schema({
    eventName: { type: String, default: 'Unnamed Event' },
    time: {
        type: String,
        required: [true, 'The time of the event must be provided'],
    },
    numberOfPeople: {
        type: Number,
        required: [true, 'Number of people coming for this event must be provided'],
    },
    organizerName: {
        type: String,
        required: [true, 'Organzier of the event must provide his name'],
    },
    organizerNumber: {
        type: String,
        required: [true, "Organizer's phone number must be provided"],
    },
    restaurant: {
        type: instance.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Which restaurant they are coming to must be indicated'],
    },
    offerApplied: {
        type: instance.Schema.Types.ObjectId,
        ref: 'Offer',
        required: [
            true,
            'Speical offer that will be applied for this visit must be provided',
        ],
    },
    timeCreated: {
        type: String,
        default: moment().format('LLL'),
    },
    timeUpdated: {
        type: String,
        default: moment().format('LLL'),
    },
});

export const Reservation = instance.model<ReservationDocument>(
    'Reservation',
    reservationSchema
);
