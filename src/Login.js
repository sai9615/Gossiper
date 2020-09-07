import React from 'react'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@material-ui/core';
import {auth, provider} from './firebase';
import {useStateValue} from './StateProvider'
import { actionTypes } from './reducer';

function Login() {
    const[{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })).catch((error) => console.log(error.messsage));
    };
    return (
        <div className="login col-auto special-card mb-3">
        <div className="card bg-transparent ">
        <label type="button" onClick={signIn} className="buttons" >Sign In with </label>
        <img width="20px" alt="Google sign-in"  className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" /> 
        </div>
        <div className="footer"> Designed by Sai Milind</div>
        </div>
        
    )
}

export default Login