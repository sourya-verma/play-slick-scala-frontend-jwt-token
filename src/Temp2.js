import React from 'react'
import './index.css'
import { NavLink } from "react-router-dom";
import { Container, Typography, AppBar, Toolbar, Button } from '@material-ui/core'

export default function Temp2(props) {
    return (
        <>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/student">Student </NavLink></Button>
            <Button color='inherit'><NavLink className="inactive" activeClassName="active" exact to="/university">University</NavLink></Button>
        </>
    )
}
