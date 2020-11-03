import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
///////////////////////////////////////////////////////////////////
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
//////////////////////////////////////////////////////////////////
import Task from './Task';
//////////////////////////////////////////////////////////////////

const TasksList = () => {


    const projContext = useContext(projectContext);
    const taskContext = useContext(TaskContext);
    const { currentProject, deleteCurrentProject } = projContext;
    const { projectTasks } = taskContext;

    if(!currentProject) return <h2>Select a project</h2>

    const [project] = currentProject

    return ( 
        <Fragment>
            <h2>Project: {project?.name}</h2>

            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className='tarea'><p>No tasks pending</p></li>)
                    : <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Task
                                    task={task}
                                    key={task._id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn'
                onMouseEnter={e => {
                    e.target.style.backgroundColor = '#e64e4e';
                    e.target.style.color = '#fff';
                }}
                onMouseLeave={e => {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = '';
                }}
                onClick={() => deleteCurrentProject(project._id)}
            >Delete project &times;</button>
        </Fragment>

     );
}
 
export default TasksList;