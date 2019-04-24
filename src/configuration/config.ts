import { config } from 'dotenv';

config();
const envVars = process.env;

export const configuration = {
    mongo_url: envVars.MONGO_URL,
    port: envVars.PORT,
    postServicePort: envVars.POST_SERVICE_PORT,
    userServicePort: envVars.USER_SERVICE_PORT,

};
