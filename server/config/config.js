import "dotenv/config";

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongoURL: process.env.MONGO_URI_CONNECTION_STRING,
    clientURL: process.env.CLIENT_URL,
    mobileClient: process.env.MOBILE_CLIENT,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
};
