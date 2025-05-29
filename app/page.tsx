"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/components/header";
import Todos from "@/components/todos";
import NewTodo from "@/components/newTodo";
import TodosContextProvider from "@/store/todos-context";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Welcome to Our Application</h1>
        <p>
          <Link href="/about">About us</Link>
        </p>
        <TodosContextProvider>
          <NewTodo />
          <Todos />
        </TodosContextProvider>
      </main>
    </>
  );
}
