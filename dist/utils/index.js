"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perTwoMinutesLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// max 10 request per two minutes
const perTwoMinutesLimiter = (0, express_rate_limit_1.default)({
    windowMs: 2 * 60 * 1000,
    max: 15,
    handler: (req, res) => {
        return res
            .status(429)
            .json({ message: 'Too many requests, please try again later.' });
    },
});
exports.perTwoMinutesLimiter = perTwoMinutesLimiter;
