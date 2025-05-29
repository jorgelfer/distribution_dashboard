import React, { use, useContext } from "react";
import TodoItem from "./todoItem";

import { TodosContext } from "../store/todos-context";

import styles from "./todos.module.css";

// using react functional component
// React.FC is a generic type that takes props as an argument
// pluging in an explicit
// different functional component have different props
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  return (
    <ul className={styles.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          title={item.title}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
