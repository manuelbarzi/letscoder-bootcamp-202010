const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'access' }
    }


    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }
    
    handleGoToAcces = () => {
        this.setState({ view: 'access' })
    }

    handleRegister = (fullname, email, password, repassword) => {
        registerUser(fullname, email, password, repassword, error => {
            if (error) return alert(error.message)

            this.setState({ view: 'register-confirm' })
        })
    }
    handleLogin = (email, password) => {
        authenticateUser(email, password, (error, token) => {
            if (error) return alert(error.message)

            
            this.setState({ token, view: 'home' })
        })
       
    }




    render() {
        const { state: {view, token }, handleGoToAcces, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin } = this

        return <>

        <Title onHome={handleGoToAcces} />

        {view === 'access' && <Access onRegister={handleGoToRegister} onLogin={handleGoToLogin} />}

        {view === 'register' && <Register onRegister={handleRegister} />}

        {view === 'register-confirm' && <RegisterConfirm onLogin= {handleGoToLogin}/>}

        {view === 'login' && <Login onLogin={handleLogin} />}

        {view === 'home' && <Home token={token}/>}


        </>

    }
}