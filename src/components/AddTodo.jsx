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

 
};  

export default AddTodo;  
