import dotenv from 'dotenv';
dotenv.config();

export const getAllowedOrigins = () => {
  return process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000'];
};