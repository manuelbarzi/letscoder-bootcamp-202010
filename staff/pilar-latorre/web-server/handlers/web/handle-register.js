const fs = require('fs')
const path = require('path')
const registerUser = require('../../logic/register-user')

module.exports = (req, res, handleError) => {
    const { body: { fullname, email, password } } = req

    registerUser(fullname, email, password, error => {
        if (error) 
            return fs.readFile(path.join(__dirname, '../../views/register.html'), 'utf8', (_error, content) => {
                if (_error) return handleError(_error)

            res.send(content.replace('{feedback}', `<p class="feedback feedback--error">${error.message}</>`))
        })

        fs.readFile(path.join(__dirname,'../../views/register-confirm.html'), 'utf8', (error, content) => {
                if (error) return handleError(error)

                res.send(content)      
        })
    })
}







