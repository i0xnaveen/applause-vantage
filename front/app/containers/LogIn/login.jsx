import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { login, login_sucesss } from './action'
import { connect } from 'react-redux'

const Login = ({isLoggedIn, login}) => {
  const navigate = useNavigate()
  useEffect(() => {
    login() 
  }, [login])
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/emails')
    }
  }, [isLoggedIn, navigate])


  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/login'
  }

  return (
    <div className="login-container">
      <div className="glass-card">
        <h1>Welcome to MyApp</h1>
        <p>Sign in to access your emails securely</p>
        <div className='flex justify-center mt-10'>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="google-logo"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.authenticated, 
})

const mapDispatchToProps ={
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)