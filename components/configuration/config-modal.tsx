// import { usePathname } from "next/navigation";
import styles from "./config-modal.module.css";

import React, { useImperativeHandle, forwardRef, useRef } from "react";
interface ChildHandle {
  open: () => void;
}

interface ChildProps {}

const ConfigModal = forwardRef<ChildHandle, ChildProps>((props, ref) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      // Perform some action within the child
      dialog.current?.showModal();
    },
  }));

  // const path = usePathname();
  // console.log(path);
  return (
    <dialog ref={dialog} className={styles["config-modal"]}>
      <h2>Your won</h2>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ConfigModal;
