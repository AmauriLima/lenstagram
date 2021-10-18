import express from 'express';
import 'reflect-metadata';
import './database';

const app = express();

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('🔥 Server Started at http://localhost:3000'));
