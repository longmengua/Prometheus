import { config } from 'dotenv';
import { ENVType } from './type';

// load .env variable to process.env
config();

export const ENV: ENVType = {
  PORT: process.env.PORT || '',
  GRAFANA_READ: process.env.GRAFANA_READ || '',
  GRAFANA_WRITE: process.env.GRAFANA_WRITE || '',
  USER_ID: process.env.USER_ID || '',
  API_KEY: process.env.API_KEY || '',
}