import call from '../utils/call'
import { validateLevel, validateToken, validateCallback } from './helpers/validations'

export default function (token, level, callback) {
    validateToken(token)
    validateLevel(level)
    validateCallback(callback)

    call('PATCH', `http://localhost:4000/api/users/workouts/${level}`, { Authorization: `Bearer ${token}`, 'Content_type': 'application/json' },
        JSON.stringify({ level }),
        (status, response) => {
            if (status === 0)
                return callback (new Error('server error'))
            else if (status !== 201) {
                const { error } = JSON.parse(response)

                return callback(new Error(error))
            }
            callback(null)
        })
}