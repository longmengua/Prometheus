import { config } from 'dotenv';
import { ENVType } from './type';

// load .env variable to process.env
config();

export const ENV: ENVType = {
  PORT: process.env.PORT || '',
}