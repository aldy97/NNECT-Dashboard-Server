import express from 'express';
import bodyParser from 'body-parser';
import router from './routers/index';
import * as constants from './utils/constants';
import cors from 'cors';
require('dotenv').config();

import db from './db/db.config';

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://nnect-dashboard.netlify.app'],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.use('/', router);

app.listen(process.env.PORT || constants.DEFAULT_PORT, () => {
    console.log(`server is running on ${constants.DEFAULT_PORT}`);
});
