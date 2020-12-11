const { validateLevel } = require('./helpers/validations')
const { NotFoundError } = require('../errors')
const { Workout } = require('../models')

/**
 * Retrieves a workout by level
 * 
 * @param {string} level 
 * 
 * @returns {Promise}
 */
module.exports = function (level) {
    validateLevel(level)

    // return User.findById(userId).lean()
    //     .then(user => {
    //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    //         const { _id } = user

    //         user.id = _id.toString()

                if (level === 'beginner') {

                return Workout.findById('5fd24f56b252584713e17320').lean()
                    .then(workout => {
                    if (!workout) throw new NotFoundError(`workout with id ${workoutId} not found`)

                    const {name, daysWeek, level, setsWeek, _id, layout, description} = workout

                    workout.id = _id.toString()

                    const { id } = workout

                    return {name, daysWeek, level, setsWeek, id, layout, description}
                    })
                }

                else if (level === 'intermediate') {

                    return Workout.findById('5fd24e8d28e0c746d361af52').lean()
                    .then(workout => {
                    if (!workout) throw new NotFoundError(`workout with id ${workoutId} not found`)

                    const {name, daysWeek, level, setsWeek, _id, layout, description} = workout

                    workout.id = _id.toString()

                    const { id } = workout

                    return {name, daysWeek, level, setsWeek, id, layout, description}
                    })
                }

                else if (level === 'advanced') {

                    return Workout.findById('5fd24f11e717b546f7602b42').lean()
                    .then(workout => {
                    if (!workout) throw new NotFoundError(`workout with id ${workoutId} not found`)

                    const {name, daysWeek, level, setsWeek, _id, layout, description} = workout

                    workout.id = _id.toString()

                    const { id } = workout

                    return {name, daysWeek, level, setsWeek, id, layout, description}
                    })
                }
}