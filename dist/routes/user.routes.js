"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const auth_2 = require("../validations/auth");
const utils_1 = require("../utils");
const router = express_1.default.Router({ mergeParams: true });
router
    .route('/auth/profile')
    .get(auth_1.checkApiKey, utils_1.perTwoMinutesLimiter, auth_1.checkToken, user_controller_1.userProfile);
router
    .route('/auth/signin')
    .post(auth_1.checkApiKey, utils_1.perTwoMinutesLimiter, (0, validate_1.validate)(auth_2.signinSchema), user_controller_1.userSignIn);
router
    .route('/auth/signup')
    .post(auth_1.checkApiKey, utils_1.perTwoMinutesLimiter, (0, validate_1.validate)(auth_2.signupSchema), user_controller_1.userSignUp);
exports.default = router;
