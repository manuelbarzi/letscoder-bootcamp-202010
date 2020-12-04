import call from '../utils/call'
import { validateId, validateToken, validateCallback } from './helpers/validations'

export default function (token, articleId, callback) {
    validateToken(token)
    validateId(articleId)
    validateCallback(callback)

    call('PATCH', 'http://localhost:4000/api/users/articles', { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
        JSON.stringify({ savedArticles: [articleId] }),
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