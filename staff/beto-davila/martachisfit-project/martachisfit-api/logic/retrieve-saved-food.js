const { validateId } = require('./helpers/validations')
const { NotFoundError } = require('../errors')
const { User, Food } = require('../models')

/**
 * Retrieves an array with the food added by the user to his/her diet
 * 
 * @param {string} userId 
 * 
 * @returns {Promise}
 */

module.exports = function (userId) {
    validateId(userId)

    
debugger
    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const { savedFood } = user

            return Promise.all(savedFood.map(foodId => 
                 Food.findById(foodId).lean()
                    .then(food => {
                        if (!food) throw new NotFoundError(`food with id ${foodId} not found`)

                        const {name, calories, carbs, protein, fats} = food

                         return({ name, calories, carbs, protein, fats })
                        //  return addedFood
                    })
            ))
        })
        .then(results => results)
    }