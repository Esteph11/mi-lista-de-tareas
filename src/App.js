import React, { useState, useEffect } from 'react';  
import TodoList from './components/TodoList';  
import AddTodo from './components/AddTodo';  
import 'bootstrap/dist/css/bootstrap.min.css';  

const App = () => {  
    const [todos, setTodos] = useState([]);  

    useEffect(() => {  
        const savedTodos = JSON.parse(localStorage.getItem('todos'));  
        if (savedTodos) {  
            setTodos(savedTodos);  
        }  
    }, []);  

    useEffect(() => {  
        localStorage.setItem('todos', JSON.stringify(todos));  
    }, [todos]);  

    const addTodo = (text) => {  
        const newTodo = {  
            id: Date.now(),  
            text,  
            status: 'Por hacer',  
        };  
        setTodos([...todos, newTodo]);  
    };  

    const updateTodo = (id) => {  
        const updatedTodos = todos.map(todo =>  
            todo.id === id ? { ...todo, status: todo.status === 'Por hacer' ? 'En progreso' : (todo.status === 'En progreso' ? 'Finalizada' : 'Por hacer') } : todo  
        );  
        setTodos(updatedTodos);  
    };  

    const deleteTodo = (id) => {  
        setTodos(todos.filter(todo => todo.id !== id));  
    };  

    return (  
        <div className="container mt-5">  
            <h1 className="text-center">TODO LIST</h1>  
            <AddTodo onAdd={addTodo} />  
            <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />  
        </div>  
    );  
};  

export default App;  
