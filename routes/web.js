
const isGuest = require('../middlewares/isGuest')
const AuthController = require('../controllers/auth')
const isAuthed = require('../middlewares/isAuthed')

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('dashboard/index.html')
})

router.get('/login', isGuest, AuthController.login)
router.post('/login', AuthController.loginPost)
router.post('/logout', isAuthed, AuthController.logout)

module.exports = {
  prefix: '/',
  routes: router
}
