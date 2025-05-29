import React from "react";
import Todo from "../models/todo";
import TodoItem from "./todoItem";
// using react functional component
// React.FC is a generic type that takes props as an argument
// pluging in an explicit
// different functional component have different props
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem key={item.id} title={item.title} />
      ))}
    </ul>
  );
};

export default Todos;
