const { Model } = require('objection')

class Instructor extends Model {
  static get tableName () {
    return 'instructors'
  }

  static get relationMappings () {
    const Lesson = require('./Lesson')

    return {
      lessons: {
        relation: Model.HasManyRelation,
        modelClass: Lesson,
        join: {
          from: 'instructors.id',
          to: 'lessons.instructor_id'
        }
      }
    }
  }
}

module.exports = Instructor
