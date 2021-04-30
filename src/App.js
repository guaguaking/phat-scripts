import React from "react"
import img from "./assets/images/img.jpeg"

var App = ()=> {
    return(
        <>
            <h1>App</h1>
            <img src={img} width="0"/>
        </>

    )
}
console.log(process.env.NODE_ENV)

export default App