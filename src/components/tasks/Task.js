import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';


const Task = ({task}) => {

    const projContext = useContext(projectContext);
    const taskContext = useContext(TaskContext);

    const { currentProject } = projContext;
    const { getTasks, deleteTask, actTask, saveCurrentTask } = taskContext;
    const [project] = currentProject 
    const handleClick = (id) => {
        deleteTask(id, project._id);
        getTasks(project.id)
    }

    const changeState = currentTask => {
        if(currentTask.state){
            currentTask.state = false;
        } else {
            currentTask.state = true;
        }

        actTask(currentTask)
    }

    const selectTask = currentTask => {
        saveCurrentTask(currentTask)
    }

    return ( 
        <li className='tarea sombra'>
            <p>{task.name}</p>

            <div className="estado">
                {task.state 
                    ?(
                        <button
                            type='button'
                            className='completo'
                            onClick={() => changeState(task)}
                        >Completed</button>
                    )
                    :(
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => changeState(task)}
                        >In progress</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => selectTask(task)}
                >Edit</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => handleClick(task._id)}
                >Delete</button>
            </div>
        </li>
     );
}
 
export default Task;