import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const app: express.Application = express();

app.use(express.json());

const prisma = new PrismaClient();

const port: number = 3000;

const userRouters = require ('./app/routes/user')
app.use(userRouters)

const registerRouters = require ('./app/routes/register')
app.use(registerRouters)

const loginRouters = require ('./app/routes/login')
app.use(loginRouters)

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`);
});
