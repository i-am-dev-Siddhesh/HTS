"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.signinSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signinSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])'))
        .pattern(new RegExp('(?=.*[A-Z])'))
        .pattern(new RegExp('(?=.*[0-9])'))
        .pattern(new RegExp('(?=.*[!@#$%^&*])'))
        .required()
        .messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `Password is a required field`,
    }),
});
exports.signupSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field',
    }),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])'))
        .pattern(new RegExp('(?=.*[A-Z])'))
        .pattern(new RegExp('(?=.*[0-9])'))
        .pattern(new RegExp('(?=.*[!@#$%^&*])'))
        .required()
        .messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `Password is a required field`,
    }),
    first_name: joi_1.default.string().required().messages({
        'string.base': `First name should be a type of string`,
        'string.empty': `First name cannot be an empty field`,
        'any.required': `First name is a required field`,
    }),
    last_name: joi_1.default.string().required().messages({
        'string.base': `Last name should be a type of string`,
        'string.empty': `Last name cannot be an empty field`,
        'any.required': `Last name is a required field`,
    }),
});
