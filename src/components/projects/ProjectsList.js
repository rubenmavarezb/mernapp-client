import React, {useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
////////////////////////////////////////////////////////////////////////
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext'
///////////////////////////////////////////////////////////////////////
import Project from './Project';
///////////////////////////////////////////////////////////////////////


const ProjectsList = () => {

    const projContext = useContext(projectContext);
    const { projects, message, getProjects } = projContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext

    useEffect(() => {

        //If it's an error
        if(message) {
            showAlert(message.msg, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message])

    if(projects.length === 0) return <p>No available projects, you can create one by clicking the "New project" button.</p>;

    return ( 
        <ul className='listado-proyectos'>
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Project

                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectsList;