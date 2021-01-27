import mongoose from 'mongoose';
import { RestaurantDocument } from './Restaurant';
import db from '../db/db.config';
import moment from 'moment';

const instance = db.instance;

export interface IOffer {
    title: string;
    restaurantID: RestaurantDocument['_id'] | RestaurantDocument;
    description: string;
    available: boolean;
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime: string;
    repeat: string;
    maxPeople: number;
    createdOn?: string;
    updatedOn?: string;
}

export type OfferDocument = mongoose.Document & IOffer;

const offerSchema = new instance.Schema({
    title: {
        type: String,
        required: [true, 'Special offer title must be provided'],
    },
    restaurantID: {
        type: instance.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'A speical offer must belong to an existing restaurant'],
    },
    description: {
        type: String,
        required: [true, 'Special offer description must be provided'],
    },
    available: { type: Boolean, required: [true, 'Availablity must be provided'] },
    startDate: { type: String, required: [true, 'Start date must be provided'] },
    endDate: { type: String, default: 'This is a one-day offer' },
    startTime: { type: String, required: [true, 'Start time must be provided'] },
    endTime: { type: String, required: [true, 'End time must be provided'] },
    repeat: { type: String, required: [true, 'Repeat must be provided'] },
    maxPeople: {
        type: Number,
        required: [
            true,
            'Maximum number of people who can use this offer must be provided',
        ],
    },
    createdOn: { type: String, default: moment().format('LLL') },
    updatedOn: { type: String, default: moment().format('LLL') },
});

export const Offer = instance.model<OfferDocument>('Offer', offerSchema);
