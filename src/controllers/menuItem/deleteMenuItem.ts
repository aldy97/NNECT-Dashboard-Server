import { Request, Response } from 'express';
import { MenuItem } from '../../models/MenuItem';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.body;

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

    try {
        await MenuItem.deleteOne({ _id });
    } catch (e) {
        res.send({ message: MESSAGES.MENU_ITEM_NOT_EXIST });
    }

    res.send({ message: MESSAGES.MENU_ITEM_DELETE_SUCC });
};
