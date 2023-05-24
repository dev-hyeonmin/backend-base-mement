import { HttpException } from "@nestjs/common";
import { DATA_NOT_FOUND, INVALID_VERIFICATION, TOKEN_EXPIRED, TOKEN_INVAILD, USER_NOT_FOUND } from "./errors.constants";

export class ValidationException extends HttpException {
    constructor(message?: string) {
        super('Invalid verification.', INVALID_VERIFICATION);
    }
}

export class TokenInvaildException extends HttpException {
    constructor() {
        super('Invalid token', TOKEN_INVAILD);
    }
}

export class TokenExpiredException extends HttpException {
    constructor() {
        super('Token has expired', TOKEN_EXPIRED);
    }
}

export class UserNotFoundException extends HttpException {
    constructor(message?: string) {
        super(message ? message : 'User Not Found', USER_NOT_FOUND);
    }
}

export class DataNotFoundException extends HttpException {
    constructor(message?: string) {
        super(message ? message : 'Data Not Found', DATA_NOT_FOUND);
    }
}