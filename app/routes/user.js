const controller = require ('../controllers/user')
const express = require ('express')
const  router = express.Router()

const path = 'user'

router.get(
    `/${path} `,
    controller.getData
)

module.exports = router