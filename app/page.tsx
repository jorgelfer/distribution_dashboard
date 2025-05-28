import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Our Application</h1>
      <p><Link href="/about">About us</Link></p>
    </main>
  );
}
