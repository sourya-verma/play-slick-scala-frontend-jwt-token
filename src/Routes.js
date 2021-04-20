import React, {useContext} from 'react'
import { Switch } from 'react-router'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectedLogin from './ProtectedLogin'
import ProtectedSignup from './ProtectedSignup'
import AuthApi from './AuthApi'
import RoutesUtil from './RoutesUtil' 
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
const Routes=()=>{

  
    const Auth = useContext(AuthApi)

    return(  
        <>
            <Switch>
                <ProtectedLogin exact path="/" auth={Auth.auth} component={LoginPage}/>
                <ProtectedSignup exact path="/signup" auth={Auth.auth} component={SignupPage}/>
                <ProtectedRoutes exact path="/student" auth={Auth.auth} component={RoutesUtil }/>
                <ProtectedRoutes exact path="/university" auth={Auth.auth} component={RoutesUtil }/>
            </Switch>
        </>
    );
}
export default Routes;