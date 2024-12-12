import React, { useState } from 'react';  

const AddTodo = ({ onAdd }) => {  
    const [titulo, setTitulo] = useState('');  
    const [descripcion, setDescripcion] = useState('');  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        if (titulo && descripcion) {  
            onAdd({ titulo, descripcion });  
            setTitulo('');  
            setDescripcion('');  
        }  
    };  

    return (  
        <form className="input-group mb-3" onSubmit={handleSubmit}>  
            <input  
                type="text"  
                className="form-control"  
                placeholder="Título"  
                value={titulo}  
                onChange={(e) => setTitulo(e.target.value)}  
            />  
            <input  
                type="text"  
                className="form-control"  
                placeholder="Descripción"  
                value={descripcion}  
                onChange={(e) => setDescripcion(e.target.value)}  
            />  
            <button className="btn btn-primary" type="submit">Agregar Todo</button>  
        </form>  
    );  
};  

export default AddTodo;  
