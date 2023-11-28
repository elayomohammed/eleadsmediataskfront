import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
require('../styles/login.css');

const Login = () => {

    const { loginWithRedirect } = useAuth0();

    return(
        <div className="container-fluid" id="login">
            <div id="loginSignup-head">
                <h4>Welcome to eLeads Meadia, we are here to serve you...</h4>
            </div>
            <form id="login-form" className="d-grid gap-2">
                <input type="submit" value="Log In Or Sign Up" className="btn btn-primary" id="submit" onClick={() => loginWithRedirect()} /><br /><br />
            </form>
        </div>
    )
}
export default Login;
