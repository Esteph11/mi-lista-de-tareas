import React, { useState, useEffect } from 'react';  
import Modal from './Modal';  

const TodoList = () => {  
    const [todoArray, setTodoArray] = useState([]);  
    const completeCount = todoArray.filter(todo => todo.isComplete).length;  
    const pendingCount = todoArray.length - completeCount;  
    const [formData, setFormData] = useState({ titulo: '', descripcion: '' });  
    const [todoEditId, setTodoEditId] = useState(null);  
    const [modalEliminar, setModalEliminar] = useState({ isOpen: false, todo: {} });  

    useEffect(() => {  
        const data = window.localStorage.getItem('todoItems');  
        if (data) setTodoArray(JSON.parse(data));  
    }, []);  

    useEffect(() => {  
        window.localStorage.setItem('todoItems', JSON.stringify(todoArray));  
    }, [todoArray]);  

    const handleChange = ({ target }) => {  
        setFormData({ ...formData, [target.name]: target.value });  
    };  

    const addTodo = (e) => {  
        e.preventDefault();  
        if (todoEditId !== null) {  
            const newTodo = [...todoArray];  
            let todo = newTodo.find(t => t.id === todoEditId);  
            todo.titulo = formData.titulo;  
            todo.descripcion = formData.descripcion;  
            setTodoArray(newTodo);  
            setTodoEditId(null);  
        } else {  
            if (formData.titulo && formData.descripcion) {  
                const todo = {   
                    ...formData,   
                    isComplete: false,   
                    id: Date.now(),   
                    fecha: new Date().toLocaleString('es-ES', { 
                        hour12: true, 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit', 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric' 
                    })  
                };  
                setTodoArray([...todoArray, todo]);  
            }  
        }  
        setFormData({ titulo: '', descripcion: '' });  
    };  

    const deleteTodo = (id) => {  
        const newTodos = todoArray.filter(todo => todo.id !== id);  
        setTodoArray(newTodos);  
        setModalEliminar({ isOpen: false, todo: {} });  
    };  

    const toggleTodo = (id) => {  
        const newTodo = [...todoArray];  
        let todo = newTodo.find(todo => todo.id === id);  
        todo.isComplete = !todo.isComplete;  
        setTodoArray(newTodo);  
    };  

    const deleteAllComplete = () => {  
        const newTodo = todoArray.filter(todo => !todo.isComplete);  
        setTodoArray(newTodo);  
    };  

    const setTodoEdit = (id) => {  
        const todo = todoArray.find(todo => todo.id === id);  
        setFormData({ titulo: todo.titulo, descripcion: todo.descripcion });  
        setTodoEditId(id);  
    };  

    return (  
        <div className="container mt-5">
        <div className="card">
        <div className="card-header text-center">
        <div className="container mt-5">  
            <h3 className="mb-4 text-center">Agregar Tareas a la Lista</h3>

            <form className="input-group mb-3" onSubmit={addTodo}>  
                <input className="form-control" type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} />  
                <input className="form-control" type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />  
                <button className="btn btn-primary" type="submit">Agregar Tarea</button>  
            </form>  

            <div className="mb-4 text-end">  
                <button className="btn btn-danger" onClick={deleteAllComplete}>Eliminar Tareas Completadas</button>  
            </div>  

            <table className="table table-bordered table-striped">  
                <thead className="table-secondary">  
                    <tr>  
                        <th scope="col">Tarea</th>  
                        <th scope="col">Título</th>  
                        <th scope="col">Descripción</th>  
                        <th scope="col">Fecha</th>  
                        <th scope="col">Estado</th>  
                        <th scope="col">Acciones</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {todoArray.map((todo, index) => (  
                        <tr key={todo.id}>  
                            <th scope="row">{index + 1}</th>  
                            <td>{todo.titulo}</td>  
                            <td>{todo.descripcion}</td>  
                            <td>{todo.fecha}</td>  
                            <td>
                                <input type="checkbox" className="form-check-input" checked={todo.isComplete} onChange={() => toggleTodo(todo.id)} />  
                                {todo.isComplete ? <span className="text-success ms-2">Completada</span> : <span className="text-danger ms-2">Pendiente</span>}
                            </td>  
                            <td>  
                                <button className="btn btn-warning btn-sm mx-1" onClick={() => setTodoEdit(todo.id)}><i className="bi bi-pencil"></i>Editar</button>  
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => setModalEliminar({ isOpen: true, todo: todo })}><i className="bi bi-trash"></i>Eliminar</button>  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  

            <div className="mt-3">
                <p className="text-center">
                    <strong>Total de tareas:</strong> {todoArray.length} | <strong>Completadas:</strong> {completeCount} | <strong>Pendientes:</strong> {pendingCount}
                </p>
            </div>
            </div>
                </div>
            </div>

            <Modal isOpen={modalEliminar.isOpen} onClose={() => setModalEliminar({ isOpen: false, todo: {} })}>  
                <div className='text-center py-5'>  
                    <h4>¿Desea eliminar la tarea '{modalEliminar.todo.titulo}'?</h4>  
                    <div className='d-flex justify-content-center mt-2'>  
                        <button className='btn btn-danger mx-1' onClick={() => deleteTodo(modalEliminar.todo.id)}>Sí, eliminar tarea</button>  
                        <button className='btn btn-secondary mx-1' onClick={() => setModalEliminar({ isOpen: false, todo: {} })}>No, no eliminar tarea</button>  
                    </div>  
                </div>  
            </Modal>  
        </div>  
    );  
};  

export default TodoList;
