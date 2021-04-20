import React from 'react'
// import Student from './Student'
// import University from './University'
import { NavLink } from "react-router-dom";
import { Container, Typography, AppBar, Toolbar, Button } from '@material-ui/core'
import './index.css'
import Cookies from 'js-cookie'
import AuthApi   from "./AuthApi";
export default function Main(props) {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const Auth = React.useContext(AuthApi) 
    const handleLogout=()=>{
        Auth.setAuth(false)
        Cookies.remove("user")
    }
    const userFirstName= parseJwt(Cookies.get("token")).firstName
    return (

        <Container >
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Home</Typography>
                    <NavLink activeClassName="active_class" to="/student"><Button>Student</Button></NavLink>
                    <NavLink activeClassName="active_class" to="/university"><Button>University</Button></NavLink>
                    <NavLink activeClassName="active_class" to="/university"><Button>{userFirstName}</Button></NavLink>
                
                    <Button onClick={handleLogout}>Logout</Button>  
                    


                </Toolbar>

            </AppBar>
        </Container>




    )
}
