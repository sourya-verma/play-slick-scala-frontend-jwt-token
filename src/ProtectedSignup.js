
import { Redirect, Route } from "react-router-dom";

const ProtectedSignup=({auth,component:Component,...rest}) =>{
    return(
        <Route
        {...rest}
        render = {()=> !auth ? (
            <Component/>
        ) :
        (
            <Redirect to="/student"/>
        )
        }
        />
    )
}
export default ProtectedSignup;