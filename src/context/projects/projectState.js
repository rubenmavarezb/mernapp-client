import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import axiosClient from '../../config/axios';
import {
    PROJECT_FORM, 
    GET_PROJECTS,
    ADD_PROJECTS,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR } from '../../types';

//////////////////////////////////////////////////////////////////

const ProjectState = ({children}) => {

    const initialState = {
        projects: [],
        newProject: false,
        errorForm: false,
        currentProject: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState);

    //CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    const getProjects = async () =>{
        try {
            const result = await axiosClient.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const addProject = async project => {
        try {
            const result = await axiosClient.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECTS,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    const showError = () =>{
        dispatch({
            type: VALIDATE_FORM
        })
    };

    const showCurrentProject = (projectId) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }
    
    const deleteCurrentProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type:DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {

            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                newProject: state.newProject,
                errorForm: state.errorForm,
                currentProject: state.currentProject,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                showCurrentProject,
                deleteCurrentProject
            }}
        >
            {children}
        </projectContext.Provider>
    )
}

export default ProjectState;