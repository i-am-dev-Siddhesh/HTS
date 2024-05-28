"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.userSignUp = exports.userSignIn = void 0;
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("../clients/prisma");
const messages_1 = require("../constants/messages");
const auth_1 = require("../utils/auth");
const errorResponse_1 = require("../utils/errorResponse");
// @desc    Sigin user
// @route   POST /v1/auth/user/signin
// @access  Public
const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw {
                message: messages_1.USER_MISSING,
                status_code: 404,
            };
        }
        const isValid = yield argon2_1.default.verify(user === null || user === void 0 ? void 0 : user.password, password);
        if (!isValid) {
            throw {
                status_code: 401,
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const token = (0, auth_1.createJWTToken)({
            id: user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
            first_name: user === null || user === void 0 ? void 0 : user.first_name,
            last_name: user === null || user === void 0 ? void 0 : user.last_name,
        });
        delete user.password;
        return res.status(200).json(Object.assign(Object.assign({ status: true }, token), { user }));
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userSignIn = userSignIn;
// @desc    Signup user
// @route   POST /v1/auth/user/signup
// @access  Public
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, first_name, last_name, password } = req.body;
        let existingUser = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw {
                message: messages_1.EMAIL_IN_USE,
                status_code: 409,
            };
        }
        // Encrypt the password
        const hashedPassword = yield argon2_1.default.hash(password);
        yield prisma_1.prisma.user.create({
            data: {
                email,
                first_name,
                last_name,
                password: hashedPassword,
            },
        });
        return res
            .status(200)
            .json({ status: true, message: 'User signup successfully!!!' });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userSignUp = userSignUp;
// @desc    Get user profile
// @route   POST /v1/auth/user/profile
// @access  Protected
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        let user = req.user;
        delete user.password;
        return res.status(200).json({ status: true, user });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userProfile = userProfile;
