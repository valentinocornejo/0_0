import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const app: express.Application = express();

app.use(express.json());

const prisma = new PrismaClient();

const port: number = 3000;

app.post("/login", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Obtener el usuario correspondiente al correo electrónico
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
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Usuario con este email ya existe." });
    }

    // Si no existe, insertar el nuevo usuario en la base de datos
    await prisma.user.create({
      data: {
        email: email,
        contrasenia : hash,
      },
    });

    return res.status(200).json("Usuario creado exitosamente.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`TypeScript with Express
       http://localhost:${port}/`);
});
