import { Request, Response } from 'express';
import { MenuItem, MenuItemDocument } from '../../models/MenuItem';
import { MESSAGES } from '../../utils/constants';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<void> => {
    const { _id, updatedFields } = req.body;

    if (!_id) {
        res.send({ message: MESSAGES.EMPTY_MENU_ITEM_ID });
        return;
    }

    let menuItemExists: boolean;
    try {
        menuItemExists = await MenuItem.exists({ _id });
    } catch (e) {
        res.send({ message: MESSAGES.MENU_ITEM_NOT_EXIST });
    }
    if (!menuItemExists) {
        res.send({ message: MESSAGES.MENU_ITEM_NOT_EXIST });
        return;
    }

    const newMenuItem: MenuItemDocument = await MenuItem.findOneAndUpdate(
        { _id },
        { ...updatedFields, updatedOn: moment().format('LLL') },
        {
            new: true,
            runValidators: true,
        }
    );

    res.send({ status: 200, newMenuItem });
};
