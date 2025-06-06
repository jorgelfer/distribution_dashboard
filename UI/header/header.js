import styles from "./header.module.css";
import { DATADISPLAY } from "./data.js";
import Image from "next/image";

export default function Header({ handleClick, selectedValue }) {
  function DataDisplay({ children, isSelected, ...props }) {
    return (
      <li
        className={
          isSelected
            ? styles["main-tab"] + " " + styles.active
            : styles["main-tab"]
        }
        {...props}
      >
        <Image src={children.image} alt={children.title} />
        <p>{children.title}</p>
      </li>
    );
  }

  return (
    <div className="row">
      <div className="col-10">
        <div className={styles["main-header"]}>
          <ul>
            {Object.keys(DATADISPLAY).map((objKey) => (
              <DataDisplay
                key={objKey}
                isSelected={selectedValue === objKey}
                onClick={() => handleClick(objKey)}
              >
                {DATADISPLAY[objKey]}
              </DataDisplay>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
