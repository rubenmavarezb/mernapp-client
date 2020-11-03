import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const NewAccount = ({history}) => {

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { authenticated, message, registerUser } = authContext;

    //In case user is authenticated or duplicated 
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
        name:'',
        email: '',
        password: '',
        confirm:''
    });
    //const [error, setError] = useState(false)

    const { name, email, password, confirm } = user

    const handleChange = (e) => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validate fields
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === ''){
            showAlert('All fields are required', 'alerta-error')
            return;
        }

        //Validate password length
        if(password.length < 6){
            showAlert('Password must have at least 6 characters', 'alerta-error');
            return;
        }

        //Validate that password and confirm password are the same
        if(password !== confirm){
            showAlert('Passwords are not the same', 'alerta-error');
            return;
        }

        //Passing to action
        registerUser({
            name: name,
            email: email,
            password: password
        })
    }

    return ( 
        <div className='form-usuario'>
            { alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Create your new account</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={name} 
                            placeholder="Your name..."
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirm password</label>
                        <input 
                            type="password" 
                            id="confirm" 
                            name="confirm"
                            value={confirm} 
                            placeholder="Repeat your password..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Sing up"
                        />
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'>Log In</Link>
            </div>
        </div>
     );
}
 
export default NewAccount;