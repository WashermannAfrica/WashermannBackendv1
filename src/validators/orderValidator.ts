// src/validators/orderValidator.ts

import { body, check } from 'express-validator';
import { Downs, Special, Tops } from '../entities/clothing';

export const createOrderValidationRules = () => [
  // Validate User Information
  body('user.name')
    .notEmpty()
    .withMessage('User name is required')
    .isString()
    .withMessage('User name must be a string'),

  body('user.phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone number must be a string')
    .isMobilePhone('en-NG')
    .withMessage('Invalid phone number'),

  body('user.pickupAddress')
    .notEmpty()
    .withMessage('Pickup address is required')
    .isString()
    .withMessage('Pickup address must be a string'),

  body('user.deliveryAddress')
    .notEmpty()
    .withMessage('Delivery address is required')
    .isString()
    .withMessage('Delivery address must be a string'),

  body('user.email')
    .isEmail()
    .withMessage('Invalid email format'),

    body('amount')
    .notEmpty()
    .withMessage('Order amount is required')
    .isNumeric()
    .withMessage('Order amount must be a number'),
  // Validate Order Information
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),

  body('categories.*.name')
    .notEmpty()
    .withMessage('Category name is required')
    .isString()
    .withMessage('Category name must be a string'),

  body('categories.*.hasWhite')
    .isBoolean()
    .withMessage('hasWhite must be a boolean'),

    check('categories.*.name')
    .isIn(['Tops', 'Downs', 'Special'])
    .withMessage('Category name must be one of Tops, Downs, or Special'),

  body('categories.*.clothes')
    .isArray({ min: 1 })
    .withMessage('At least one clothing item is required'),

  body('categories.*.clothes.*.clotheType')
    .notEmpty()
    .withMessage('Clothe type is required')
    .isString()
    .withMessage('Clothe type must be a string'),
    check('categories.*.clothes.*.clotheType').custom((value, { req }) => {
        const categoryName = req.body.categories.find((cat: any) =>
          cat.clothes.some((clothing: any) => clothing.clotheType === value)
        )?.name;
    
        switch (categoryName) {
          case 'Tops':
            if (!Object.values(Tops).includes(value as Tops)) {
              throw new Error(`Invalid clothe type for Tops. Must be one of ${Object.values(Tops).join(', ')}`);
            }
            break;
          case 'Downs':
            if (!Object.values(Downs).includes(value as Downs)) {
              throw new Error(`Invalid clothe type for Downs. Must be one of ${Object.values(Downs).join(', ')}`);
            }
            break;
          case 'Special':
            if (!Object.values(Special).includes(value as Special)) {
              throw new Error(`Invalid clothe type for Special. Must be one of ${Object.values(Special).join(', ')}`);
            }
            break;
          default:
            throw new Error('Unknown category');
        }
        return true;
      }),

  body('categories.*.clothes.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer greater than 0'),

  // Validate Dates
  body('pickupDate')
    .notEmpty()
    .withMessage('Pickup date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid pickup date format'),
];
