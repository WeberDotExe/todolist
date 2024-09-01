import { useState } from "react";
import React  from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, settodo] = useState('')
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault()
        if(!todo) return
        addTodo({todo,completed:false})
        settodo("")
    }

    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write your Todo's..."
                className="w-full border border-black/10 rounded-l-md px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-md px-3 py-1 bg-[#FEE715] text-[#101820] shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

