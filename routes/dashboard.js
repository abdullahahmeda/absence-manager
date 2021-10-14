const LessonsController = require('../controllers/lessons')
const ParticipantsController = require('../controllers/participants')
const InstructorsController = require('../controllers/instructors')
const isAuthed = require('../middlewares/isAuthed')
const Lesson = require('../models/Lesson')
const ProfileController = require('../controllers/profile')

const router = require('express').Router()

// router.use(isAuthed)

router.get('/', (req, res) => {
  res.render('dashboard/index.html')
})

router.get('/edit-profile', isAuthed, ProfileController.edit)
router.post('/edit-profile', isAuthed, ProfileController.update)

router.get('/lessons', LessonsController.index)
router.get('/lessons/create', isAuthed, LessonsController.create)
router.get('/lessons/:id/edit', isAuthed, LessonsController.edit)
router.post('/lessons/:id/update', isAuthed, LessonsController.update)
router.post('/lessons', isAuthed, LessonsController.store)
router.get('/lessons/:id', LessonsController.show)

router.get('/instructors', InstructorsController.index)
router.get('/instructors/create', isAuthed, InstructorsController.create)
router.post('/instructors', isAuthed, InstructorsController.store)
router.get('/instructors/:id', InstructorsController.show)

router.get('/participants', ParticipantsController.index)
router.get('/participants/create', isAuthed, ParticipantsController.create)
router.post('/participants', isAuthed, ParticipantsController.store)
router.get('/participants/:id', ParticipantsController.show)

router.get('/attendance', async (req, res) => {
  const lessons = await Lesson.query().withGraphFetched('[participants,instructor]').orderBy('lesson_date', 'DESC')
  res.render('dashboard/attendance.html', {
    lessons
  })
})

module.exports = {
  prefix: '/dashboard',
  routes: router
}
