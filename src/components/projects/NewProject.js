import React, {Fragment, useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProyect = () => {

    const projContext = useContext(projectContext);
    const { newProject, errorForm, showForm, addProject, showError} = projContext;

    const [project, saveProyect] = useState({
        name: ''
    });

    const { name } = project

    const handleChange = (e) => {
        saveProyect({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(name.trim() === ''){
            showError()
            return;
        }

        addProject(project);
        saveProyect({
            name: ''
        });
    }

    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => showForm()}
            >
                New proyect
            </button>

            {
                newProject ? (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="text" 
                            className="input-text"
                            placeholder="Your new project's name..."
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Add new project"
                            onChange={handleChange}
                        />     
                    </form>
                ) : null }

                {errorForm ? <p className='mensaje error'> Name is required</p>: null}
        </Fragment>

     );
}
 
export default NewProyect;