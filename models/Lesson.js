const { Model } = require('objection')
const Instructor = require('./Instructor')
const Participant = require('./Participant')

class Lesson extends Model {
  static get tableName () {
    return 'lessons'
  }

  static relationMappings = {
    instructor: {
      relation: Model.BelongsToOneRelation,
      modelClass: Instructor,
      join: {
        from: 'lessons.instructor_id',
        to: 'instructors.id'
      }
    },

    participants: {
      relation: Model.ManyToManyRelation,
      modelClass: Participant,
      join: {
        from: 'participants.id',
        through: {
          // persons_movies is the join table.
          from: 'participants_lessons.lesson_id',
          to: 'participants_lessons.participant_id'
        },
        to: 'lessons.id'
      }
    }
  }
}

module.exports = Lesson
