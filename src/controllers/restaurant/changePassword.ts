import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { MESSAGES } from '../../utils/constants';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<void> => {
    const { _id, updatedFields } = req.body;
    const { oldPassword, newPassword, confirmPassword } = updatedFields;

    if (!_id) {
        res.send({ message: MESSAGES.EMPTY_ID });
        return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
        res.send({ message: MESSAGES.EMPTY_PASSWORD });
        return;
    }

    let passwordCorrect: boolean;
    try {
        passwordCorrect = await Restaurant.findOne({ _id, password: oldPassword });
    } catch (err) {
        res.send({ message: MESSAGES.WRONG_CREDENTIALS });
    }
    if (!passwordCorrect) {
        res.send({ message: MESSAGES.WRONG_CREDENTIALS });
        return;
    }

    if (newPassword.length < 7) {
        res.send({ message: MESSAGES.PASSWORD_TOO_SHORT });
        return;
    }

    if (newPassword !== confirmPassword) {
        res.send({ message: MESSAGES.PASSWORD_NOT_MATCH });
        return;
    }

    const newRestaurant = await Restaurant.findOneAndUpdate(
        { _id },
        { password: newPassword, updatedOn: moment().format('LLL') },
        {
            new: true,
            runValidators: true,
        }
    );

    res.send({ status: 200, newRestaurant });
};
