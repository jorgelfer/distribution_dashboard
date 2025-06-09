// import { usePathname } from "next/navigation";
import styles from "./config-modal.module.css";

import React from "react";

interface IProps {}

const ConfigModal = React.forwardRef<HTMLDialogElement, IProps>(
  (props, ref) => {
    // const path = usePathname();
    // console.log(path);
    return (
      <dialog ref={ref} className={styles["config-modal"]}>
        <h2>Your won</h2>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);
export default ConfigModal;
