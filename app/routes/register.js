const controller = require ('../controllers/user')
const express = require ('express')
const  router = express.Router()

const path = 'register'

router.get(
    `/${path} `,
    controller.getData
)

module.exports = router