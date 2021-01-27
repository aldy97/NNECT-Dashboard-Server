require('dotenv').config();

export const MESSAGES = {
    WRONG_CREDENTIALS: 'Email and password do not match',
    EMPTY_ID: 'Restaurant ID is empty',
    EMPTY_NAME: 'Restaurant name is empty',
    EMPTY_EMAIL: 'Restaurant email is empty',
    INVALID_EMAIL: 'Email format is not valid',
    EMPTY_PHONE_NUMBER: 'Phone number is empty',
    EMPTY_ADDRESS: 'Restaurant address is empty',
    EMPTY_POST_CODE: 'Postal code is empty',
    USER_NOT_EXIST: 'This restaurant does not exist',
    USER_ALREADY_EXIST: 'This Email has been registered with NNECT',
    EMPTY_MENU_ID: 'Menu ID is empty',
    MENU_NOT_EXIST: 'Menu does not exist',
    EMPTY_MENU_ITEM_ID: 'Menu item id is empty',
    MENU_ITEM_NOT_EXIST: 'Menu item does not exist',
    MENU_ITEM_NAME_EMPTY: 'Menu item does not have a name',
    MENU_ITEM_DELETE_SUCC: 'Menu item is successfully deleted',
    EMPTY_OFFER_NAME: 'Special offer name is not provided',
    EMPTY_OFFER_DESC: 'Special offer description must be provided',
    OFFER_AVAL_UNDIFINED: 'The availablity of the special offer is not defined',
    OFFER_TIME_EMPTY: 'Time availability is not provided for this offer',
    OFFER_NOT_FOUND: 'This offer is not found',
    OFFER_ID_EMPTY: 'Offer id is not provided',
    OFFER_DEL_SUCC: 'This offer is deleted successfully',
    OFFER_TITLE_EMPTY: 'Offer title is empty or undefined',
    OFFER_DESC_EMPTY: 'Offer description is empty or undefined',
    OFFER_EDIT_SUCC: 'Offer is editted successfully',
    EMPTY_PASSWORD: 'Password is empty',
    PASSWORD_TOO_SHORT: 'Password can not be shorter than 7 chars',
    PASSWORD_NOT_MATCH: 'Password does not match with confirm password',
    START_DATE_UNDEFINED: 'Start date of the offer is not defined',
    END_DATE_UDEFINED: 'End date of the offer must be defined if it is recurring',
    EMPTY_FIELDS: 'Some filed(s) is empty',
    FORGET_PASS_EMAIL_SENT_SUCC:
        'An email with verification code has been sent to the email you entered',
    EMAIL_NOT_REGISTERED: 'This email is not registered with NNECT',
    EMPTY_VERIFICATION_CODE: 'Please enter the verification vcode',
    WRONG_VERIFICATION_CODE: 'Verification code is incorrect',
};

export const MONGODB = `mongodb+srv://fengxiong:${process.env.DB_PASSWORD}@cluster0.rudgy.mongodb.net/test?retryWrites=true&w=majority`;
export const DEFAULT_PORT = 7001;
