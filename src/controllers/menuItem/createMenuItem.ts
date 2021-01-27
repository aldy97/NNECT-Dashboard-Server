import { Request, Response } from 'express';
import { Restaurant } from '../../models/Restaurant';
import { MenuItemDocument, MenuItem, IMenuItem } from '../../models/MenuItem';
import { MESSAGES } from '../../utils/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const { restaurantID, name, description, ingredients, price } = req.body;

    if (!restaurantID) {
        res.send({ message: MESSAGES.EMPTY_MENU_ID });
        return;
    }

    let restaurantExists: boolean;
    try {
        restaurantExists = await Restaurant.exists({ _id: restaurantID });
    } catch (error) {
        res.send({ message: MESSAGES.MENU_NOT_EXIST });
    }

    if (!restaurantExists) {
        res.send({ message: MESSAGES.MENU_NOT_EXIST });
        return;
    }

    if (!name) {
        res.send({ message: MESSAGES.MENU_ITEM_NAME_EMPTY });
        return;
    }

    const menuItemInfo: IMenuItem = {
        name,
        restaurant: restaurantID,
        description,
        ingredients,
        price,
    };

    const newMenuItem: MenuItemDocument = await new MenuItem(menuItemInfo).save();
    await Restaurant.updateOne(
        { _id: restaurantID },
        { $push: { menu: newMenuItem._id } }
    );

    res.send({ status: 201, newMenuItem });
};
