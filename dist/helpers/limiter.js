"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perTwoMinutesLimiter = exports.perTwentyFourHoursLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Define a rate limiter for 1 request per 2 minutes
const perTwoMinutesLimiter = (0, express_rate_limit_1.default)({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 1, // Allow 1 request per 2 minutes per IP
    handler: (req, res) => {
        return res
            .status(429)
            .json({ message: 'Too many requests, please try again later.' });
    },
});
exports.perTwoMinutesLimiter = perTwoMinutesLimiter;
// Define a rate limiter for 10 requests per 24 hours
const perTwentyFourHoursLimiter = (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 10, // Allow 10 requests per 24 hours per IP
    handler: (req, res) => {
        return res
            .status(429)
            .json({ message: 'Too many requests, please try again later.' });
    },
});
exports.perTwentyFourHoursLimiter = perTwentyFourHoursLimiter;
