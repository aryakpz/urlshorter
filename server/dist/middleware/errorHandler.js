"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constants_1 = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants_1.constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stak
            });
            break;
        case constants_1.constants.SERVER_ERROR:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stak
            });
            break;
        case constants_1.constants.VALIDATION_ERROR:
            res.json({
                title: "validatiojnn error",
                message: err.message,
                stackTrace: err.stak
            });
            break;
        default:
            console.log("no error");
            break;
    }
};
exports.errorHandler = errorHandler;
