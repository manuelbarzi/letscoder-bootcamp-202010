const callbacks = []
let doing = false

const done = () => {
    debugger
    /*
    if (callbacks.length) {
        const callback = callbacks.shift()
        
        callback(done)

        return
    }
    */
    if (callbacks.length) return callbacks.shift()(done)
    
    doing = false
}

module.exports = callback => {
    debugger
    callbacks.push(callback)

    if (!doing) {
        doing = true

        done()
    }
}