import express from 'express';
import forgetPassword from '../controllers/email/forgetPassword';
import register from '../controllers/email/register';

const router = express.Router();

router.get('/forgetPassword/:email', forgetPassword);
router.put('/register/', register);

export default router;
