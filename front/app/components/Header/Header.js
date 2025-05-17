import React from "react";

const Header = ({icons})=>{
    return(
        <header style={{color: "blue"}}>
            <h1 className="text-xl font-semibold">Applause Vantage</h1>
            <div className="flex space-x-4">
                {icons.map((IconComponent,index)=>(
                    <IconComponent key={index} className="w-6 h-6 cursor-pointer hover:text-yellow-300" />
                ))}
            </div>
        </header>
    )

}
export default Header