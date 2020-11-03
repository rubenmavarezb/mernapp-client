import { 
    PROJECT_FORM, 
    GET_PROJECTS,
    ADD_PROJECTS,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR } from '../../types';

export default (state, action) => {
    switch(action.type){
        case PROJECT_FORM:
            return {
                ...state,
                newProject: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECTS:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                newProject: false,
                errorForm: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                currentProject: null
            }
        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}