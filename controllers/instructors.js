const Validator = require('../validator')
const Instructor = require('../models/Instructor')
const filterBody = require('../utils/filterBody')

async function index (req, res) {
  let instructors = await Instructor.query().withGraphFetched('[lessons(thisMonth) as lessonsThisMonth, lessons]').modifiers({
    thisMonth: builder => {
      builder.whereRaw('MONTH(lesson_date) = MONTH(CURRENT_DATE()) AND YEAR(lesson_date) = YEAR(CURRENT_DATE())')
    }
  })
  instructors = instructors.sort((i1, i2) => {
    if (i1.lessons.length === i2.lessons.length) return i2.lessonsThisMonth.length - i1.lessonsThisMonth.length
    return i2.lessons.length - i1.lessons.length
  })
  res.render('dashboard/instructors/index.html', {
    instructors
  })
}

async function show (req, res) {
  const id = req.params.id
  const instructor = await Instructor.query().findById(id).withGraphFetched('lessons(ordeByLessonDate)').modifiers({
    ordeByLessonDate (builder) { builder.orderBy('lesson_date', 'DESC') }
  })
  res.render('dashboard/instructors/show.html', {
    instructor
  })
}

async function create (req, res) {
  res.render('dashboard/instructors/create.html')
}

async function store (req, res) {
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, {
    name: 'required|string|min:3'
  })

  if (validation.fails()) {
    return res.redirect('/dashboard/instructors/create')
  }

  await Instructor.query().insert(filteredBody)
  res.redirect('/dashboard/instructors')
}

module.exports = {
  index,
  show,
  create,
  store
}
