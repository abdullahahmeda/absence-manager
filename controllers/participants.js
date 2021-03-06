const Validator = require('../validator')
const Participant = require('../models/Participant')
const filterBody = require('../utils/filterBody')

async function index (req, res) {
  let participants = await Participant.query().withGraphFetched('[lessons(thisMonth) as lessonsThisMonth, lessons]').modifiers({
    thisMonth: builder => {
      builder.whereRaw('MONTH(lesson_date) = MONTH(CURRENT_DATE()) AND YEAR(lesson_date) = YEAR(CURRENT_DATE())')
    }
  })
  participants = participants.sort((p1, p2) => {
    if (p1.lessons.length === p2.lessons.length) return p2.lessonsThisMonth.length - p1.lessonsThisMonth.length
    return p2.lessons.length - p1.lessons.length
  })
  res.render('dashboard/participants/index.html', {
    participants
  })
}

async function show (req, res) {
  const id = req.params.id
  const participant = await Participant.query().findById(id).withGraphFetched('lessons')
  res.render('dashboard/participants/show.html', {
    participant
  })
}

async function create (req, res) {
  res.render('dashboard/participants/create.html')
}

async function store (req, res) {
  const filteredBody = filterBody(req.body)
  const validation = new Validator(filteredBody, {
    name: 'required|string|min:3'
  })

  if (validation.fails()) {
    return res.redirect('/dashboard/participants/create')
  }

  await Participant.query().insert(filteredBody)
  res.redirect('/dashboard/participants')
}

module.exports = {
  index,
  show,
  create,
  store
}
