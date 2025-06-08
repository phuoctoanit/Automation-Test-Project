import dotenv from 'dotenv';
import path from 'path';

dotenv.config();// config/config.ts

export const config = {
  PORT: process.env.PORT || 3001,
  AUTH_TOKEN: process.env.AUTH_TOKEN || '',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || ''
};