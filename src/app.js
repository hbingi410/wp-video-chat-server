import express from 'express';
import cors from 'cors';
import { getAllowedOrigins } from './config/cors.js';

const app = express();
const allowedOrigins = getAllowedOrigins();

app.use(cors({
  origin: allowedOrigins
}));

export { app, allowedOrigins };