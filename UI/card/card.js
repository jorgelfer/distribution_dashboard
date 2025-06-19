import styles from "./card.module.css";

export default function Card(props) {
  return (
    <div ref={props.ref} className={styles.card}>
      {props.children}
    </div>
  );
}
