import styles from "./todoItem.module.css";
// not interested on the return type of onRemoveTodo
const TodoItem: React.FC<{ title: string; onRemoveTodo: () => void }> = (
  props
) => {
  return (
    <li className={styles.item} onClick={props.onRemoveTodo}>
      {props.title}
    </li>
  );
};
export default TodoItem;
