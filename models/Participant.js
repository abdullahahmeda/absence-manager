const { Model } = require('objection')

class Participant extends Model {
  static get tableName () {
    return 'participants'
  }

  static get relationMappings () {
    const Lesson = require('./Lesson')

    return {
      lessons: {
        relation: Model.ManyToManyRelation,
        modelClass: Lesson,
        join: {
          from: 'participants.id',
          through: {
            from: 'participants_lessons.participant_id',
            to: 'participants_lessons.lesson_id'
          },
          to: 'lessons.id'
        }
      }
    }
  }
}

module.exports = Participant
