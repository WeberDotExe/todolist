import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, settodos] = useState([])

  const addTodo = (todo) =>{
    settodos((prev) =>[{id:Date.now(),...todo},...prev])
  }

  const updatedTodo = (id,todo)=>{
    settodos((prev)=> prev.map((prevtodo)=>(prevtodo.id === id ? todo: prevtodo)))
  }

  const deleteTodo = (id)=>{
    settodos((prev)=> prev.filter((todo)=>todo.id !== id))
  }

  const toggleComplete =(id)=>{
    settodos((prev)=>prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo,completed:!prevTodo.completed} : prevTodo ))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      settodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#101820] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-[#FBEAEB] shadow-lg rounded-lg px-4 py-3 text-[#FBEAEB]">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
