import React, {useEffect } from "react";
import { useState } from "react";
import "./App.css";
import List from "./List";
import arrow from "../Images/arrow.svg";

type Todo = {
    [key: string] : any,
    title: string,
    active: boolean,
    complited: boolean,
    id: number,
}
export default function App(){
    const [todos, setTodos] = useState<Todo[] | undefined>([]);
    const [str, setStr] = useState<string>("");
    const [status, setStatus] = useState<string>("all");
    function addTodo(item: Todo): void {
        setTodos(prev => {
            return [...prev, item];
        });
    }
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStr(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTodo({
            title: str,
            active: true,
            complited: false,
            id: Date.now(),
        });
        setStr("");
    };
    function renderStatus(){
        return <div className="status_todos">
            <div className="status_todos_left">{todos.filter(v => v.complited === false).length} item(s) left</div>
                <div className="status_todos_statuses">
                    {["All", "Active", "Complited"].map(s => {
                        return <div 
                                    key={s} 
                                    className="status_todo"
                                    data-status={s.toLowerCase()}
                                    onClick={e => setStatus(e.currentTarget.getAttribute("data-status"))}
                                    style={{border: s.toLowerCase() === status ? "1px solid black" : "none"}}
                                    >{s}</div>
                        })
                    }
                </div>
            <div className="status_todos_clear" onClick={() => setTodos(todos.filter(v => v.complited === false))}>Clear completed</div>
        </div>
    };
    function changeStatusTodo(todo: Todo, field: string) : void{
        let i = todos.findIndex(v => {
            return v.id === todo.id;
        });
        let newTodo = {
            ...todo,
            [field]: !todo[field],
        };
        let prev = todos.slice(0, i);
        let next = todos.slice(i + 1);
        setTodos([...prev, newTodo, ...next]);
    }
    function filteredTodos(todos: Todo[], status: string) : Todo[]{
        if(status === "all"){
            return todos;
        };
        return todos.filter(v => {
            return v[status] === true;
        })
    }

    return  <div className="app">
                <h1 data-testid="test" className="app_title">TODOS</h1>
                <div className="app_add_todo">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <input 
                                className="app_todo_input"
                                onChange={(e) => handleInput(e)} 
                                type="text" 
                                value={str}
                                placeholder="What we needs to done?"
                                />
                    </form>
                    {todos.length === 0 ? "Список задач пуст" : <List todos={filteredTodos(todos, status)} changeStatusTodo={changeStatusTodo}/>}
                    {todos.length === 0 ? "" : renderStatus()}
                </div>
            </div>
}