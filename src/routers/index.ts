import express from 'express';
import Restaurant from './restaurant';
import MenuItem from './menuItem';
import Offer from './offer';
import Email from './email';

const router = express.Router();

router.use('/api', Restaurant);
router.use('/api', MenuItem);
router.use('/api', Offer);
router.use('/api', Email);

export default router;
