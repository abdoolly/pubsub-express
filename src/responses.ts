import { Response } from "express";
import { curry } from 'ramda';


/**
 * @description main respond function which all other responds are made using it
 * NOTE: this function is curried
 */
const respond = curry((status: number, res: Response, message: any) => {
    return res.status(status).send({ message });
});

/**
 * @description response function type
 */
type responseFn = (res: Response, message: any) => Response<any>;

/**
 * @description a function used to respond with validation errors
 */
export const validationErrorResponse: responseFn = respond(422);

/**
 * @description
 */
export const systemError: responseFn = respond(400);

/**
 * @description a function used to respond with server errors
 */
export const serverError: responseFn = respond(500);

/**
 * @description a function used to respond with success responses
 */
export const successResponse: responseFn = respond(200);