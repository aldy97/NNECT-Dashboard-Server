import express from 'express';
import createMenuItem from '../controllers/menuItem/createMenuItem';
import getMenuItems from '../controllers/menuItem/getMenuItems';
import updateMenuItem from '../controllers/menuItem/updateMenuItem';
import deleteMenuItem from '../controllers/menuItem/deleteMenuItem';

const router = express.Router();

router.post('/createMenuItem', createMenuItem);
router.get('/getMenuItems', getMenuItems);
router.put('/updateMenuItem', updateMenuItem);
router.put('/deleteMenuItem', deleteMenuItem);

export default router;
