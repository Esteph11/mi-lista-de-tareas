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
                    fecha: new Date().toLocaleString(), 
                    hour12: true, 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
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
            <form className="input-group mb-3" onSubmit={addTodo}>  
                <input className="form-control" type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} />  
                <input className="form-control" type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />  
                <button className="btn btn-primary" type="submit">Agregar Tarea</button>  
            </form>  

            <div className="mb-4">  
                <div className="d-flex align-items-center justify-content-between mb-3">  
                    <h5>Todo List</h5>  
                    <button className="btn btn-danger" onClick={deleteAllComplete}>Eliminar Tareas Completadas</button>  
                </div>  

                {todoArray.map(todo => (  
                    <div key={todo.id} className="d-flex align-items-center mb-2">  
                        <input type="checkbox" className="form-check-input mx-2" checked={todo.isComplete} onChange={() => toggleTodo(todo.id)} />  
                        <div className="flex-grow-1">  
                            <p className={`m-0 ${todo.isComplete ? 'text-decoration-line-through' : ''}`}>  
                                {todo.titulo}<br />  
                                <span className="text-muted">{todo.descripcion}</span><br />  
                                <small className="text-muted">Fecha: {todo.fecha}</small> {/* Mostrar la fecha */}  
                            </p>  
                        </div>  
                        {todo.isComplete && <span className="badge bg-success">Completada</span>}  
                        <button className="btn btn-warning mx-1" onClick={() => setTodoEdit(todo.id)}><i className="bi bi-pencil"></i> Editar</button>  
                        <button className="btn btn-danger mx-1" onClick={() => setModalEliminar({ isOpen: true, todo: todo })}><i className="bi bi-trash"></i> Eliminar</button>  
                    </div>  
                ))}  

                <div className="list-group-item">  
                    <span>Total de tareas: {todoArray.length}, completadas: {completeCount}, pendientes: {pendingCount}</span>  
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