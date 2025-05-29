"use client";

import { useState } from "react";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/components/header";
import Todos from "@/components/todos";
import Todo from "@/models/todo";
import NewTodo from "@/components/newTodo";

export default function Home() {
  // this state is a list of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <>
      <Header />
      <main>
        <h1>Welcome to Our Application</h1>
        <p>
          <Link href="/about">About us</Link>
        </p>
        <div>
          <NewTodo onAddTodo={addTodoHandler} />
          <Todos items={todos} />
        </div>
      </main>
    </>
  );
}
