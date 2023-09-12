import "dotenv/config";

export const config = {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URI_CONNECTION_STRING,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
};
