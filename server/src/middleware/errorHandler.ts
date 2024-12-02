import { ErrorRequestHandler, NextFunction } from 'express';
import { constants } from '../constants'

export const errorHandler: ErrorRequestHandler = (err: any, req: any, res: any, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stak
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stak
            })
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                title: "validatiojnn error",
                message: err.message,
                stackTrace: err.stak
            })
            break;
        default:
            console.log("no error")
            break;
    }
}
