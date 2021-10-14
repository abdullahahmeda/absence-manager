const Validator = require('../validator')
const Lesson = require('../models/Lesson')
const Instructor = require('../models/Instructor')
const Participant = require('../models/Participant')
const filterBody = require('../utils/filterBody')
const logger = require('../logger')

async function index (req, res) {
  const lessons = await Lesson.query().withGraphFetched('instructor').orderBy('lesson_date', 'DESC')
  res.render('dashboard/lessons/index.html', {
    lessons
  })
}

async function show (req, res) {
  const id = req.params.id
  const lesson = await Lesson.query().findById(id).withGraphFetched('[instructor,participants]')
  res.render('dashboard/lessons/show.html', {
    lesson
  })
}

async function edit (req, res) {
  const id = req.params.id
  const lesson = await Lesson.query().findById(id).withGraphFetched('[instructor,participants]')
  if (!lesson) {
    return res.redirect('/dashboard')
  }
  const instructors = await Instructor.query()
  const remainingParticipants = await Participant.query().whereNotIn('id', lesson.participants.map(p => p.id))
  res.render('dashboard/lessons/edit.html', {
    lesson,
    instructors,
    remainingParticipants
  })
}

async function create (req, res) {
  const instructors = await Instructor.query()
  const participants = await Participant.query()
  res.render('dashboard/lessons/create.html', {
    instructors,
    participants
  })
}

async function store (req, res) {
  if (typeof req.body.participants === 'number' || typeof req.body.participants === 'string') req.body.participants = [req.body.participants]
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, attributesRules)

  if (validation.fails()) {
    return res.redirect('/dashboard/lessons/create')
  }

  try {
    await Lesson.transaction(async trx => {
      return await Lesson.query(trx).insertGraph([
        {
          name: filteredBody.name,
          lesson_date: filteredBody.lesson_date,
          instructor: { id: filteredBody.instructor_id },
          participants: filteredBody.participants.map(value => ({ id: parseInt(value) }))
        }
      ], {
        relate: true
      })
    })
  } catch (error) {
    logger.error('Error while adding a lesson transaction')
    logger.error(error.stack)
  }
  res.redirect('/dashboard/lessons')
}

async function update (req, res) {
  const lesson = await Lesson.query().findById(req.params.id)
  if (!lesson) {
    return res.redirect('/dashboard')
  }
  if (typeof req.body.participants === 'number' || typeof req.body.participants === 'string') req.body.participants = [req.body.participants]
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, attributesRules)

  if (validation.fails()) {
    return res.redirect(`/dashboard/lessons/${lesson.id}/edit`)
  }

  try {
    await Lesson.transaction(async trx => {
      return await Lesson.query(trx).upsertGraph(
        {
          id: lesson.id,
          name: filteredBody.name,
          lesson_date: filteredBody.lesson_date,
          instructor: { id: filteredBody.instructor_id },
          participants: filteredBody.participants.map(value => ({ id: parseInt(value) }))
        }, {
          relate: true,
          unrelate: true
        })
    })
  } catch (error) {
    logger.error('Error while updating a lesson')
    logger.error(error.stack)
  }
  res.redirect('/dashboard/lessons')
}

const attributesRules = {
  name: 'required|string|min:3',
  lesson_date: 'required|date',
  instructor_id: 'required|integer',
  participants: 'required|array'
}

module.exports = {
  index,
  show,
  edit,
  create,
  store,
  update
}
