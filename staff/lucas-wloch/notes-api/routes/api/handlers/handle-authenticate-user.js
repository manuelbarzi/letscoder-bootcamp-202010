const { authenticateUser } = require('../../../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET, JWT_EXP } } = process


module.exports = (req, res, handleError) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(userId => {
                debugger
                const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

                res.status(200).json({ token })
            })
            .catch(error => handleError(401, error))
    } catch (error) {
        handleError(400, error)
    }
}
