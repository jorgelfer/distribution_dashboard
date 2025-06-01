"use client";

import styles from "./page.module.css";
import Link from "next/link";
// import Header from "@/components/header";
// import Todos from "@/components/todos";
// import NewTodo from "@/components/newTodo";
// import TodosContextProvider from "@/store/todos-context";
import Case from "@/models/case";
import { infile1_map } from "@/models/case";
import Login from "@/UI/login";
import { useState } from "react";

export default function Home() {
  // const queryClient = new QueryClient();

  const [enteredCase, setEnteredCase] = useState<Case>(new Case("13Bus"));

  const handleInputChange = (identifier: string, value: string) => {
    setEnteredCase((prevCase) => ({
      ...prevCase,
      [identifier]: value,
    }));

    // By default change inFile1 based on networkModel
    if (identifier === "networkModel") {
      setEnteredCase((prevCase) => ({
        ...prevCase,
        inFile1: infile1_map[value],
      }));
    }
  };

  return (
    <>
      <main>
        <Login />
      </main>
    </>
  );
}
