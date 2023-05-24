import { HttpException } from "@nestjs/common";
import { INVALID_VERIFICATION, TOKEN_EXPIRED, USER_NOT_FOUND } from "./errors.constants";

export class ValidationException {
    constructor(
        message?: string
    ) {
        return new HttpException('Invalid verification.', INVALID_VERIFICATION);
    }
}

export class TokenExpiredException {
    constructor() {
        return new HttpException('Token has expired', TOKEN_EXPIRED);
    }
}

export class UserNotFoundException extends HttpException{
    constructor(message?: string) {
        super(message ? message : 'User Not Found', USER_NOT_FOUND);
    }
}