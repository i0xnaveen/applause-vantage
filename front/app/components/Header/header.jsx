<<<<<<< HEAD
import React from "react";

const Header = ({icons})=>{
    return(
<Header style={{ backgroundColor: '#012E5B' }}>
            <div className="flex space-x-4">
                {icons.map((IconComponent,index)=>(
                    <IconComponent key={index} className="w-6 h-6 cursor-pointer hover:text-yellow-300" />
                ))}
            </div>
        </Header>
        
    )

}
=======
import React from "react"

const Header = ()=>(
  <div style={{ backgroundColor: '#012E5B' }}>
    <div className="flex space-x-4">Hello
    </div>
  </div>
        
)
>>>>>>> 4bf54ea4 (Naveen (#3))
export default Header