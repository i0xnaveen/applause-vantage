import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import Header from '../../components/Header/header'
import Sidebar from '../../components/sidebar'

const MyComponent = () => {
  const [login, setLogin] = useState(false)

  if (!login) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      <Sidebar />
    </>
  )
}

export default MyComponent
