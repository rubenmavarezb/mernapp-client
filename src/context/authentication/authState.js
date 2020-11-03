import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { 
    SUCCESSFUL_REGISTRATION,
    REGISTRATION_ERROR,
    GET_USER,
    SUCCESSFUL_LOGIN,
    LOGIN_ERROR,
    LOG_OUT } from '../../types/index';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = ({children}) => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = async data => {
        try {
            const response = await axiosClient.post('api/users', data);
            //console.log(response);

            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            })

            authenticatedUser()
        } catch (error) {

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type:REGISTRATION_ERROR,
                payload: alert
            })
        }
    }

    //Return logged in user
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    const logIn = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            })

            authenticatedUser()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type:LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const logOut = () => {
        dispatch({
            type:LOG_OUT
        })
    }

    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                authenticatedUser,
                logIn,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;
