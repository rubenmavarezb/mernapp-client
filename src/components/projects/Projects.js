import React, {useState, useEffect, useContext} from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import TasksForm from '../tasks/TasksForm';
import TasksList from '../tasks/TasksList';
import AuthContext from '../../context/authentication/authContext'

const Proyects = () => {

    //Extracting auth info
    const authContext = useContext(AuthContext);
    const { authenticatedUser } = authContext;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        authenticatedUser()
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize)
        // eslint-disable-next-line
    }, [])
    
    return ( 
        <div className='contenedor-app'>
            {windowWidth >= 770 ? <Sidebar/> : <Bar/>}
            <div className="seccion-principal">
                {windowWidth >= 770 ?  <Bar/> : <Sidebar/>}
                <main>
                    <TasksForm/>
                    <div className="contenedor-tareas">
                        <TasksList/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyects;