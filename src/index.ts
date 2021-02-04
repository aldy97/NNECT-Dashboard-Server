import express from 'express';
import bodyParser from 'body-parser';
import router from './routers/index';
import * as constants from './utils/constants';
import cors from 'cors';
require('dotenv').config();

import db from './db/db.config';

const app = express();

const PORT = process.env.PORT || constants.DEFAULT_PORT;

app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
            'https://nnect-dashboard-client.netlify.app',
        ],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
