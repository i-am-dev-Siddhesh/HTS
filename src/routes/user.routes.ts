import express from 'express';
import { checkApiKey, checkToken } from '../middlewares/auth';

import {
  userProfile,
  userSignIn,
  userSignUp,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../validations/auth';
import { perTwoMinutesLimiter } from '../utils';

const router = express.Router({ mergeParams: true });

router
  .route('/auth/profile')
  .get(checkApiKey, perTwoMinutesLimiter, checkToken, userProfile);

router
  .route('/auth/signin')
  .post(checkApiKey, perTwoMinutesLimiter, validate(signinSchema), userSignIn);

router
  .route('/auth/signup')
  .post(checkApiKey, perTwoMinutesLimiter, validate(signupSchema), userSignUp);

export default router;
