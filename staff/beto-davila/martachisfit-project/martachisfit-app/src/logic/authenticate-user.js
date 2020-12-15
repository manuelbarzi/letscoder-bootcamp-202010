import call from '../utils/call'
import { validateEmail, validatePassword, validateCallback } from './helpers/validations'
// import { context } from '.'

export default function (email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    // const API_URL = process.env.REACT_APP_API_URL

    call('POST', `https://localhost:4000/api/users/auth`, { 'Content-type': 'application/json' },
        JSON.stringify({ email, password }),
        (status, response) => {
            if (status === 0)
                return callback(new Error('server error'))

            else if (status !== 200) {
                const { error } = JSON.parse(response)

                return callback(new Error(error))
            }
            const { token } = JSON.parse(response)

            callback(null, token)
        })
}//).bind(context)