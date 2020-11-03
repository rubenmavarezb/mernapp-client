import React, { useReducer }from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import { SHOW_ALERT, HIDE_ALERT } from '../../types/index';


const AlertState = ({children}) => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        })

        //After 5 sec clear the error
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000)
    }

    return ( 
        <alertContext.Provider
            value={{
                alert:state.alert,
                showAlert
            }}
        >
            {children}
        </alertContext.Provider>
     );
}
 
export default AlertState;