import argon2 from 'argon2';
import { prisma } from '../clients/prisma';
import {
  EMAIL_IN_USE,
  EMAIL_PASSWORD_INVALID,
  USER_MISSING,
} from '../constants/messages';
import { createJWTToken } from '../utils/auth';
import { generalError, generalErrorStatusCode } from '../utils/errorResponse';

// @desc    Sigin user
// @route   POST /v1/auth/user/signin
// @access  Public
export const userSignIn = async (req: Request, res: any) => {
  try {
    const { email, password }: any = req.body;
    let user: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw {
        message: USER_MISSING,
        status_code: 404,
      };
    }

    const isValid = await argon2.verify(user?.password!, password);

    if (!isValid) {
      throw {
        status_code: 401,
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const token = createJWTToken({
      id: user.id,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    });

    delete user.password;
    return res.status(200).json({ status: true, ...token, user });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Signup user
// @route   POST /v1/auth/user/signup
// @access  Public
export const userSignUp = async (req: Request, res: any) => {
  try {
    const { email, first_name, last_name, password }: any = req.body;
    let existingUser: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw {
        message: EMAIL_IN_USE,
        status_code: 409,
      };
    }

    // Encrypt the password
    const hashedPassword = await argon2.hash(password);
    await prisma.user.create({
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
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Get user profile
// @route   POST /v1/auth/user/profile
// @access  Protected
export const userProfile = async (req: Request, res: any) => {
  try {
    //@ts-ignore
    let user = req.user;
    delete user.password;
    return res.status(200).json({ status: true, user });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
