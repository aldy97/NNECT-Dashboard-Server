import mongoose from 'mongoose';
import moment from 'moment';
import db from '../db/db.config';

const instance = db.instance;

export interface IRegister {
    email: string;
    registerCode: number;
    createdOn?: string;
}

export type RegisterDocument = mongoose.Document & IRegister;

const registerSchema = new instance.Schema({
    email: { type: String, required: [true, 'Email must be provided'] },
    registerCode: {
        type: Number,
        required: [true, 'Register code must be provided'],
    },
    createdOn: { type: String, default: moment().format('LLL') },
});

export const Register = instance.model<RegisterDocument>('Register', registerSchema);
