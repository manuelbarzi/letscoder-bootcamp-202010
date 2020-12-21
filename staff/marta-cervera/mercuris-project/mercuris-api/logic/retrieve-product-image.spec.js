require('dotenv').config()

const { expect } = require('chai')
const { randomStringWithPrefix, randomWithPrefixAndSuffix, randomNonString, randomEmptyOrBlankString, randomId, randomInteger } = require('../utils/random')
require('../utils/array-polyfills')
const retrieveProductImage = require('./retrieve-product-image')
const { models: { User, Product }, mongoose } = require('mercuris-data')
const { ContentError, LengthError } = require('../errors')

const { env: { MONGODB_URL } } = process

describe('retrieveProductImage()', () => {
    before(() => mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }))

    describe('on existing user', () => {
        let name, email, password, address, city, phone, description, price, owner

        beforeEach(async() => {
            name = `${randomStringWithPrefix('name')} ${randomStringWithPrefix('surname')}`
            email = randomWithPrefixAndSuffix('email', '@mail.com')
            password = randomStringWithPrefix('password')
            address = randomStringWithPrefix('address')
            city = randomStringWithPrefix('city')
            phone = randomStringWithPrefix('phone')
            owner= randomId()
           
            name = randomStringWithPrefix('name')
            description= randomStringWithPrefix('description')
            price = '' + randomInteger(10, 100)   

            image = '../data/products/default.jpg'
            file = path.join(__dirname, `../data/products/${productId}.jpg`)

            const user = { name, email, password, address, city, phone, owner }

            const newUser = await User.create(user)
            owner = '' + newUser._id
            
            const product = {name, description, price, image, owner}

            const newProduct = await Product.create(product)
            productId = '' + newProduct._id

        })

        it('shoud succed on a existing product', () => {
           return  retrieveProductImage(productId)
               
            .then(file => 
                expect(file).to.be.instanceOf(Object))
            
        })

        afterEach(() =>
            User.deleteMany().then(()=>{Product.deleteMany().then(()=>{})})
                
        )
    })

    describe('on a non existing product', () => {
        let productId

        beforeEach(() => {
            
            productId = randomId()

        })

        it('shoud fail when product does not exists', () => {
            return retrieveProductImage(productId)
                .catch(error => {
                    expect(error).to.be.instanceOf(Error)

                    expect(error.message).to.equal(`product with id ${productId} not found`)
                })
            
        })

    }) 

     describe('when any parameter is wrong', () => {
        describe('when id is wrong', () => {
            
                describe('when id is empty or blank', () => {
                    let productId
            
                    beforeEach(() => {
            
                        productId = randomEmptyOrBlankString()
                        
                    })
            
                    it('should fail on an empty or blank name', () => {
                        expect(() => retrieveProductImage(productId, () => { })).to.throw(ContentError, 'id is empty or blank')
                    })
                })
                describe('when id is not a string', () => {
                    let productId
            
                    beforeEach(() => {
                        productId = randomNonString()
                        
                    })
            
                    it('should fail when id is not an string', () => {
                        expect(() => retrieveProductImage(productId, () => { })).to.throw(TypeError, `${productId} is not an id`)
                    })
            
                })
                describe('when id lenght is not 24', () => {
                    let productId
            
                    beforeEach(() => {
                        productId = '5fbcd46c1cc24f9c7ce22db000'
                        
                    })
            
                    it('should fail swhen id is not an string', () => {
                        expect(() => retrieveProductImage(productId, () => { })).to.throw(LengthError, `id length ${productId.length} is not 24`)
                    })
                    
                })
        
        }) 
    
    after(mongoose.disconnect)
    })
})
