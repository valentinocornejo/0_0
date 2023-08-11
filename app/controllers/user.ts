import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const app: express.Application = express();

app.use(express.json());

const prisma = new PrismaClient();

const port: number = 3000;

exports.getData = {
    login : app.post("/login", async (req: Request, res: Response) => {
        try {
          const email = req.body.email;
          const password = req.body.password;
      
          const user = await prisma.user.findUnique({
            where: { email: email },
          });
      
          if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado." });
          }
      
          const hashMatch = await bcrypt.compare(password, user.contrasenia);
          if (!hashMatch) {
            return res.status(401).json({ error: "Usuario o email incorrecto." });
          }
      
          return res.status(200).json({ message: "Login exitoso." });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
}