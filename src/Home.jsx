import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillTrashFill, BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(() => {
                // Update state without reloading
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, done: true } : todo
                ));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                // Remove deleted item from state
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>Task List</h2>
            <Create setTodos={setTodos} />
            {todos.length === 0 ? (
                <div><h2>No record</h2></div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id} className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill className='icon' />
                            ) : (
                                <BsCircleFill className='icon' />
                            )}
                            <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
