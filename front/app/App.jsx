import React from 'react'
import EmailList from '../app/containers/emailList/emailList'
import EmailItem from './containers/emailList/emailItem'
import StartUp from './containers/startUp/startUp'
import AiInput from './containers/AiInput/AiInput'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './containers/LogIn/login'


const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path = '/' element = {<StartUp/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path = '/emails' element = {<EmailList/>}/>
        <Route path='/ai' element = {<AiInput/>}/>
        <Route path = "/emails/:id" element = {<EmailItem/>} />
      </Routes>
    </div>
  </Router>
)

export default App
