const { Router } = require('express')
const { jsonBodyParser} = require('../../middlewares')

const {
    handleRegisterUser,
    handleAuthenticateUser,
    handleRetrieveUser,
    handleSaveProduct,
    handleFindProduct,
    handleSaveProductImage,
    handleRetrieveProduct
    

} = require('./handlers')
const handleRetrieveProductImage = require('./handlers/handle-retrieve-product-image')


const withErrorHandling = require('./helpers/with-error-handling')

const router = new Router()
//registerUser
router.post('/api/users', jsonBodyParser,(handleRegisterUser))
//authenticateUser
router.post('/api/users/auth', jsonBodyParser, withErrorHandling(handleAuthenticateUser))
//retrieveUser
router.get('/api/users', withErrorHandling(handleRetrieveUser))
//saveProduct
router.post('/api/products',jsonBodyParser, withErrorHandling(handleSaveProduct))
//findProduct
router.get('/api/products/', withErrorHandling(handleFindProduct))
//retrieveProduct
router.get('/api/products', withErrorHandling,(handleRetrieveProduct))
//saveProductImage
router.post('/api/products/:productId/images', withErrorHandling(handleSaveProductImage))
//retrieveProductImage
router.get('/api/products/:productId/images', withErrorHandling(handleRetrieveProductImage))



module.exports = router

