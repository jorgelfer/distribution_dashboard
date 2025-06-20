import styles from "./button.module.css";

const Button = (props) => {
  return (
    <button
      className={
        props.isActive ? styles.button + " " + styles.active : styles.button
      }
      onClick={() => props.onClick(props.id)}
      type={props.type ? props.type : "button"}
    >
      {props.label}
    </button>
  );
};

export default Button;
