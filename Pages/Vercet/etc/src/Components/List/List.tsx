import React from "react";
import "./List.css";
type Todo = {
    [key: string] : any,
    title: string,
    active: boolean,
    complited: boolean,
    id: number,
}

export default function List({todos, changeStatusTodo}: {todos: Todo[], changeStatusTodo: (todo: Todo, filed: string) => void}){
    return  <div className="list">
                <ul className="list-todo">
                    {todos.length === 0 ? <li className="list-todo-no">Нет соответсвующих задач</li> : todos.map(item => {
                        const {title, active, complited, id} = item;
                        return  <li key={"" + id} className="todo-item">
                                    <input 
                                        defaultChecked={complited ? true : false} 
                                        onChange={() => changeStatusTodo(item, "complited")}
                                        type="checkbox"/>
                                        <label 
                                            onClick={() => changeStatusTodo(item, "active")}
                                            style={{textDecoration: active ? "none" : "line-through"}}
                                            >{title}</label>
                                </li>
                    })}
                </ul>
            </div>
};