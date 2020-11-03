import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Proyect = ({project}) => {

    const projContext = useContext(projectContext);
    const taskContext = useContext(TaskContext);
    const { showCurrentProject } = projContext;
    const { getTasks } = taskContext;

    const setCurrentProject = id => {
        showCurrentProject(id);
        getTasks(id);
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => setCurrentProject(project._id)}
            >{project.name}</button>
        </li>
     );
}
 
export default Proyect;