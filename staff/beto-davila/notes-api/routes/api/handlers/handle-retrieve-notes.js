const { retrieveNotes } = require('../../../logic')

module.exports = (req, res, handleError) => {

    const { headers: { authorization } } = req
    // Bearer <token>
    const id = authorization.replace('Bearer ', '')
    
    debugger

    res.setHeader('Access-Control-Allow-Origin', '*')

    try {
        retrieveNotes(id, (error, user) => {
            if (error) return handleError(401, error)
        
            res.status(200).json(user)
            })
        } catch (error) {
            handleError(400, error)   
        }
}