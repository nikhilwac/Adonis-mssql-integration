import { DateTime } from "luxon";
import { HttpStatusCodes } from "./HttpStatuses";

export interface APIResponse {
    status_code: HttpStatusCodes;
    message: string;
    data?: any;
    success: boolean;
    errors?: any;
    timestamp: string;
    meta?: Object
}

const timestamp = DateTime.now().toISO()

export default class JsonResponse {
    /**
     * Generates a success response.
     * @param data - The data to include in the response.
     * @param message - A success message.
     * @param meta - Additional metadata to include in the response.
     * @returns A JSON response object.
     */
    static success(data: any = {}, message: string = 'Success',meta: Object = {}): APIResponse {
        return {
            status_code: HttpStatusCodes.HTTP_OK,
            message: message,
            data: data,
            success: true,
            timestamp,
            meta
        };
    }

    /**
     * Generates an error response.
     * @param message - An error message.
     * @param status_code - An HTTP status code (default is 500).
     * @returns A JSON response object.
     */
    static error(message: string = 'An error occurred', status_code: HttpStatusCodes = HttpStatusCodes.HTTP_INTERNAL_SERVER_ERROR): APIResponse {
        return {
            status_code,
            message: message,
            success: false,
            timestamp
        };
    }

    /**
     * Generates a validation error response.
     * @param errors - The validation errors to include in the response.
     * @param message - A validation error message.
     * @param status_code - An HTTP status code (default is 422).
     * @returns A JSON response object.
     */
    static validationError(errors: any = {}, message: string = 'Validation failed',status_code: HttpStatusCodes = HttpStatusCodes.HTTP_VALIDATION_ERROR): APIResponse {
        return {
            status_code,
            message: message,
            errors: errors,
            success: false,
            timestamp
        };
    }

    /**
     * Generates a custom response.
     * @param status - The status of the response.
     * @param message - A message describing the response.
     * @param data - The data to include in the response.
     * @param code - An optional HTTP status code.
     * @returns A JSON response object.
     */
    static custom(status_code: HttpStatusCodes, message: string, data: any = {}, success: boolean): APIResponse {
        const response: APIResponse = {
            status_code,
            message: message,
            data: data,
            success,
            timestamp
        };
        return response;
    }
}