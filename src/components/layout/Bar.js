import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext'

const Bar = () => {

    //Extracting auth info
    const authContext = useContext(AuthContext);
    const { user, authenticatedUser, logOut } = authContext;

    useEffect(() => {
        authenticatedUser()
        //eslint-disable-next-line
    }, [])
    return ( 
        <header className='app-header'>
            <p className="nombre-usuario">Hello <span>{user?.name}</span></p>
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logOut()}
                >Log out</button>
            </nav>
        </header>
     );
}
 
export default Bar;