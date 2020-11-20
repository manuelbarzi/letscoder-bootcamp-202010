import logo from './logo.svg';
import './App.css';
import {SignUp, SignIn} from './components'
import {useState} from 'react'
import {registerUser, retrieveUser} from './logic'
import {authenticateUser}from './logic'
import Home from './components/Home';

function App() {
  const [view,setView] = useState('sign-in')

  const handleSignUp = (fullname, email, password) => {
    try{
    registerUser(fullname, email, password, error => {
      if(error) return alert (error.message)

      setView('sign-in')
    })
  }catch (error){
    alert(error.message)
  
  }
  }

  const handleSignIn = (email,password) => {
    try{
    authenticateUser(email, password, (error,token) => {
      if(error) return alert(error)

      sessionStorage.token = token

      console.log(token)
      setView('home')
    })
    }catch (error) {
    alert(error.message)
  }
  }

/*     const handleRetrieveUser = (token) =>{
    retrieveUser (token, callback => {
      if(error) return alert (error)

      setView('home')
    })
  } */ 
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Aida ¡</h1>
        
        {view === 'sign-up' && <SignUp onSignUp={handleSignUp}/>}
        {view === 'sign-in' && <SignIn onSignIn= {handleSignIn}/>}
        {view === 'home' && <Home />}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
