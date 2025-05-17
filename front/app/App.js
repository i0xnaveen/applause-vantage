import React from "react";

import Header from "./components/Header/Header"
import { Menu, Bell } from "lucide-react";

const App = ()=>{
  return (
    <div>
      <Header icons={[Menu, Bell]} />
      <p>Welcome to the react app</p>
    </div>
  )
}
export default App
