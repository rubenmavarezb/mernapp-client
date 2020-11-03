import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TasksForm = () => {

    
    const projContext = useContext(projectContext);
    const taskContext = useContext(TaskContext);

    const { currentProject } = projContext;
    const { selectedTask, taskError, getTasks, addTask, validateTask, actTask, cleanTask } = taskContext;

    useEffect(() => {
        if(selectedTask !== null){
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask])
    
    const [task, setTask] = useState({
        name: ''
    });



    const { name } = task

    if(!currentProject) return null;

    const [project] = currentProject;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(name.trim() === ''){
            validateTask();
            return;
        }

        if(selectedTask === null) {
            task.project = project._id;
            
            //add new task to task's state
            addTask(task);
        } else {
            //act existing task
            actTask(task);

            //delete selected task
            cleanTask()
        }

        getTasks(project.id)

        setTask({
            name: ''
        })

    }

    return ( 
        <div className='formulario'>
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="Tasks name..." 
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input  
                        type="submit"
                        value={selectedTask ? 'Modify task' : 'Add task'}
                        className="btn btn-primario btn-submit btn-block"
                    />
                </div>
            </form>

            {taskError ? <p className='mensaje error'>The name of the task is required</p>: null}
        </div>
     );
}
 
export default TasksForm;