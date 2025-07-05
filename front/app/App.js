import React from "react";
import Sidebar from "./components/sidebar";
import GlobalStyle from "./Global-style";

  const App = ()=>{

    const pages = [
    { label: 'Admin', href: '#home', icon: '🏠' },

  ];
    return (
      <div>
        <GlobalStyle/>
        <Sidebar pages={pages}/>
        <p>Welcome to the rct app</p>
      </div>
    )
  }
  export default App
