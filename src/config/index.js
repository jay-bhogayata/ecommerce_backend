import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommdb",
  JWT_SECRET: process.env.JWT_SECRET || "highlySecret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_REGION: process.env.S3_REGION,
};

export default config;
