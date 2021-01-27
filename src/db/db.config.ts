import mongoose, { Mongoose } from 'mongoose';
import * as CONFIG from '../utils/constants';
require('dotenv').config();

/*
remove deprecation warnings
*/
mongoose.set('useFindAndModify', false);

const connect = (): Mongoose => {
    // connect to db
    console.error(`password is ${CONFIG.MONGODB}`);
    mongoose.connect(CONFIG.MONGODB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise,
        useUnifiedTopology: true,
    });

    // connection successful
    mongoose.connection.once('open', () => {
        console.log('db connection successful!');
    });

    // connection failed
    mongoose.connection.on('error', (err: any) => {
        console.log('db connection failed: ', err);
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
