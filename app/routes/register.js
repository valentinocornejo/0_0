const express = require ('express')
const bcrypt = require('bcrypt')
const  router = express.Router()

router.post("/register", async (Request, Response) => {
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
  })
module.exports = router