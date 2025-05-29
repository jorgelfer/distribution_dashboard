import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/components/header";
import Todos from "@/components/todos";
import Todo from "@/models/todo";

export default function Home() {
  const todos = [
    new Todo("Buy groceries"),
    new Todo("Walk the dog"),
    new Todo("Finish project report"),
    new Todo("Call mom"),
    new Todo("Read a book"),
  ];

  return (
    <>
      <Header />
      <main>
        <h1>Welcome to Our Application</h1>
        <p>
          <Link href="/about">About us</Link>
        </p>
        <div>
          <Todos items={todos} />
        </div>
      </main>
    </>
  );
}
