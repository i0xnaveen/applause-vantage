  import React from "react";

  import Header from "./components/Header/Header"
  import { Menu, Bell } from "lucide-react";
  import GlobalStyle from "./Global-style";

  const App = ()=>{
    return (
      <div>
        <GlobalStyle/>
        <Header icons={[Menu, Bell]} />
        <p>Welcome to the rct app</p>
      </div>
    )
  }
  export default App
