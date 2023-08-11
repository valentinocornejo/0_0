const controller = require ('../controllers/user')
const express = require ('express')
const  router = express.Router()

const path = 'login'

route.get(
    `/${path} `,
    controller.getData
)

module.exports = router