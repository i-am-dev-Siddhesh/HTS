export const __prod__ = process.env.SERVER_ENV === 'production';

export const ACCESS_DENIED_MESSAGE = 'Access to the resource is denied',
  NOT_AUTHENTICATED_MESSAGE =
    'You are not authenticated to perform this action',
  GENERAL_ERROR_MESSAGE = 'Something went wrong',
  SERVER_RUNNING_MESSAGE = 'Server is in running state';

export const tokenKey = 'qid',
  tokenExp = 1000 * 60 * 60 * 24, // 24 hours
  refreshTokenExp = 1000 * 60 * 60 * 24 * 60; // 30 days

export const signedUrlExp = 600; // seconds
