import express from 'express';
import login from '../controllers/restaurant/login';
import getRestaurantInfo from '../controllers/restaurant/getRestaurantInfo';
import getAllRestaurantsInfo from '../controllers/restaurant/getAllRestaurantsInfo';
import updateRestaurantInfo from '../controllers/restaurant/updateRestaurantInfo';
import changePassword from '../controllers/restaurant/changePassword';
import createRestaurant from '../controllers/restaurant/createRestaurant';
import verifyResetPassword from '../controllers/restaurant/verifyResetPassword';
import deleteAllRestaurants from '../controllers/restaurant/deleteAllRestaurants';

const router = express.Router();
router.post('/login', login);
router.get('/getRestaurantInfo/:_id', getRestaurantInfo);
router.get('/getAllRestaurantsInfo', getAllRestaurantsInfo);
router.put('/updateRestaurantInfo', updateRestaurantInfo);
router.put('/changePassword', changePassword);
router.post('/createRestaurant', createRestaurant);
router.post('/verifyResetPassword', verifyResetPassword);
router.delete('/deleteAllRestaurants', deleteAllRestaurants);

export default router;
