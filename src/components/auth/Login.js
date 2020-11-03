import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const Login = ({history}) => {

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { authenticated, message, logIn } = authContext;

    useEffect(() => {
        if(authenticated){
            history.push('/projects')
        }
        if(message){
            showAlert(message.msg, message.category)
        }
        // eslint-disable-next-line
    }, [authenticated, message, history])

    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user

    const handleChange = (e) => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            showAlert('All fields are required', 'alerta-error')
            return;
        }
        logIn({ email, password })
    }

    return ( 
        <div className='form-usuario'>
            { alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Log In</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={email} 
                            placeholder="Your email..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={password} 
                            placeholder="Your password..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Log in"
                        />
                    </div>
                </form>

                <Link to={'/new-account'} className='enlace-cuenta'>Register</Link>
            </div>
        </div>
     );
}
 
export default Login;