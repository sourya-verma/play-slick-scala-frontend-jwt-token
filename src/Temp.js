
import React from 'react'
import {  Button } from '@material-ui/core'
import { NavLink } from "react-router-dom";
import './index.css'    
 const Temp = () =>{
    return (
        <>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to = "/signup">Signup</NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to = "/login">Login</NavLink></Button>
        </>
    )
}
export default Temp;