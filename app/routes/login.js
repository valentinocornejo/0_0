const express = require ('express')
const  router = express.Router()

router.post("/login", async (Request, Response) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
  
      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado." });
      }
  
      const hashMatch = await bcrypt.compare(password, user.password);
      if (!hashMatch) {
        return res.status(401).json({ error: "Usuario o email incorrecto." });
      }
  
      return res.status(200).json({ message: "Login exitoso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

module.exports = router;