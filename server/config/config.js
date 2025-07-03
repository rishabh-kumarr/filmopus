import "dotenv/config";

const required = (key, fallback = null) => {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: process.env.PORT || 5000,
  mongoURL: required("MONGO_URI_CONNECTION_STRING"),
  tokenSecret: required("TOKEN_SECRET"),
  tokenExpiration: process.env.TOKEN_EXPIRATION || 36000, // in seconds
};
