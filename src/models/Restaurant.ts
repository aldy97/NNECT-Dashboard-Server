import mongoose from 'mongoose';
import { MenuItemDocument } from './MenuItem';
import { OfferDocument } from './Offer';
import db from '../db/db.config';
import moment from 'moment';
import validator from 'validator';

const instance = db.instance;

export interface IRestaurant {
    name: string;
    buesinessName?: string;
    managerName?: string;
    managerNumber?: string;
    managerEmail?: string;
    email: string;
    phoneNumber: string;
    password: string;
    menu?: Array<MenuItemDocument['_id']> | MenuItemDocument[];
    offers?: Array<OfferDocument['_id']> | OfferDocument[];
    GST?: string;
    city?: string;
    streetAddress?: string;
    postCode?: string;
    maxCapacity?: string;
    resetCode?: number;
    createdOn?: string;
    updatedOn?: string;
}

export type RestaurantDocument = mongoose.Document & IRestaurant;

const restaurantSchema = new instance.Schema({
    name: { type: String, required: [true, 'A restaurant must have a name'] },
    buesinessName: {
        type: String,
        default: 'Not provided',
    },
    managerName: {
        type: String,
        default: 'Not provided',
    },
    managerNumber: {
        type: String,
        default: 'Not provided',
    },
    email: {
        type: String,
        required: [
            true,
            'An email must be provided when a restaurant owner is registered',
        ],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number must be provided for contact'],
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
    },
    menu: [
        {
            type: instance.Schema.Types.ObjectId,
            ref: 'MenuItem',
        },
    ],
    offers: [
        {
            type: instance.Schema.Types.ObjectId,
            ref: 'Offer',
        },
    ],
    GST: {
        type: String,
        default: 'Not provided',
    },
    city: { type: String, default: 'Not provided' },
    streetAddress: {
        type: String,
        default: 'Not provided',
    },
    postCode: { type: String, default: 'Not provided' },
    maxCapacity: {
        type: String,
        default: '0',
    },
    resetCode: { type: Number, default: 1000 },
    createdOn: { type: String, default: moment().format('LLL') },
    updatedOn: { type: String, default: moment().format('LLL') },
});

export const Restaurant = instance.model<RestaurantDocument>(
    'Restaurant',
    restaurantSchema
);
