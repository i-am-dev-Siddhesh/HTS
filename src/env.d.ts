import { Session } from 'express-session';
import { IUser } from './utils/types';

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    API_KEY: string;
    CLIENT_URL: string;
    DATABASE_URL: string;
    JWT_TOKEN_SECRET: string;
    DOMAIN: string;
    SERVER_ENV: string;
  }
}

declare namespace Express {
  export interface Request {
    session: Session;
    user: IUser;
  }
}
