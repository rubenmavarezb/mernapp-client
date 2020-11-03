import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';
import {PROJECT_TASKS,
        ADD_TASK,
        VALIDATE_TASK,
        DELETE_TASK,
        CURRENT_TASK,
        ACT_TASK,
        CLEAN_TASK } from '../../types';

const TaskState = ({children}) => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getTasks = async project => {
        try {
            const result = await axiosClient.get('/api/tasks', { params: {project}});
            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async task => {
        try {
            const result = await axiosClient.post('/api/tasks', task);
            console.log(result)
            dispatch({
                type:ADD_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTask = async (taskId, project) => {
        console.log(project)
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, { params: {project}})
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            })
        } catch (error) {
            console.log(error)
        }
    }

    const actTask = async task => {
        console.log(task)
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            console.log(result)
            dispatch({
                type:ACT_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }


    const saveCurrentTask = task => {
        dispatch({
            type:CURRENT_TASK,
            payload: task
        })
    }

    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK,
        })
    }
    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveCurrentTask,
                actTask,
                cleanTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export default TaskState;