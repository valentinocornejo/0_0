const express = require('express');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')
import { PrismaClient } from '@prisma/client';


const app  = express();

app.use(express.json());

const prisma = new PrismaClient();


const registerRouters = require ('./app/routes/register')
app.use(registerRouters)

const loginRouters = require ('./app/routes/login')
app.use(loginRouters)


app.listen(300, function(){
  console.log("Server is running...")
})