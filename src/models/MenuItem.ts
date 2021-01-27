import mongoose from 'mongoose';
import { RestaurantDocument } from './Restaurant';
import db from '../db/db.config';
import moment from 'moment';

const instance = db.instance;

export interface IMenuItem {
    name: string;
    restaurant: RestaurantDocument['id'] | RestaurantDocument;
    description?: string;
    ingredients?: string;
    price?: number;
    createdOn?: string;
    updatedOn?: string;
}

export type MenuItemDocument = mongoose.Document & IMenuItem;

const menuItemSchema = new instance.Schema({
    name: { type: String, required: [true, 'Item name must be provided'] },
    restaurant: {
        type: instance.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    description: { type: String, default: 'Not provided' },
    ingredients: { type: String, default: 'Not provided' },
    price: { type: Number, default: 0 },
    createdOn: { type: String, default: moment().format('LLL') },
    updatedOn: { type: String, default: moment().format('LLL') },
});

export const MenuItem = instance.model<MenuItemDocument>('MenuItem', menuItemSchema);
