import mongoose, { Mongoose } from 'mongoose';
import * as CONFIG from '../utils/constants';
import consola from 'consola';
require('dotenv').config();

const DB_URL =
    process.env.NODE_ENV === 'production' ? CONFIG.MONGODB : CONFIG.LOCAL_DB;

/*
remove deprecation warnings
*/
mongoose.set('useFindAndModify', false);

const connect = (): Mongoose => {
    consola.log(`DB_URL: ${DB_URL}`);
    // connect to db
    mongoose.connect(DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise,
        useUnifiedTopology: true,
    });

    // connection successful
    mongoose.connection.once('open', () => {
        consola.log('db connection successful!');
    });

    // connection failed
    mongoose.connection.on('error', (err: any) => {
        consola.error('db connection failed: ', err);
    });

    // return mongoose instance
    return mongoose;
};

export const disconnect = (): void => {
    mongoose.disconnect();
};

export default {
    instance: mongoose,
    connect: connect,
    disconnect: disconnect,
};
