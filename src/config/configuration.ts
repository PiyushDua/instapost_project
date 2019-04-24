import { config } from 'dotenv';
import IConfig from './IConfig';

config();

const envVars: NodeJS.ProcessEnv = process.env;

const configuration: IConfig = Object.freeze({
  mongo_url: envVars.MONGO_URL || 'any',
  node_env: envVars.NODE_ENV || 'any',
  port: envVars.PORT || 'any',
  secret: envVars.SECRET || 'any',
});

export default configuration;
