import styles from "./todoItem.module.css";
const TodoItem: React.FC<{ title: string }> = (props) => {
  return <li className={styles.item}>{props.title}</li>;
};
export default TodoItem;
