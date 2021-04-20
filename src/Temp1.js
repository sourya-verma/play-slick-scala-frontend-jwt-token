import React from 'react'
import './index.css'
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'
import { Container, Typography, AppBar, Toolbar, Button } from '@material-ui/core'

export default function Temp1(props) {

    
    const Auth = React.useContext(AuthApi) 
    const handleLogout=()=>{
        Cookies.remove("token")
        Auth.setAuth(false)
        
    }
    return (
        <>
            <Button className='inactive'>{props.name}</Button>
            
            <Button variant="contained" color="secondary" component="span" onClick={handleLogout}>Logout</Button>
        </>
    )
}
