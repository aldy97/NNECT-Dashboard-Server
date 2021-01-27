import express from 'express';
import createOffer from '../controllers/offer/createOffer';
import getOffers from '../controllers/offer/getOffers';
import deleteOffer from '../controllers/offer/deleteOffer';
import editOffer from '../controllers/offer/editOffer';

const router = express.Router();

router.post('/createOffer', createOffer);
router.get('/getOffers/:_id', getOffers);
router.delete('/deleteOffer/:_id', deleteOffer);
router.put('/editOffer', editOffer);

export default router;
