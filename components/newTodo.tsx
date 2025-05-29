import { useRef, useContext } from "react";
import styles from "./newTodo.module.css";
import { TodosContext } from "../store/todos-context";

// we need define the type of the onAddTodo prop
// we are not returning anything from this function,
// so we can use void as the return type
const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();

    // use ! if you are sure that the ref will not be null
    // use ? if you are not sure
    const enteredText = todoTextInputRef.current!.value;
    if (enteredText.trim().length === 0) {
      // throw an error or show a message
      return;
    }

    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandle} className={styles.form}>
      <label htmlFor="text"> Todo text </label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
