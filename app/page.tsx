import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Welcome to Our Application</h1>
        <p>
          <Link href="/about">About us</Link>
        </p>
      </main>
    </>
  );
}
