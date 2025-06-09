import { usePathname } from "next/navigation";
import styles from "./config-modal.module.css";

import React, { useImperativeHandle, forwardRef, useRef } from "react";
import SchedulingConfig from "./scheduling-config";
interface ChildHandle {
  open: () => void;
  close: () => void;
}

interface ChildProps {}

const ConfigModal = forwardRef<ChildHandle, ChildProps>((props, ref) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
    },
    close: () => {
      dialog.current?.close();
    },
  }));

  function handleDialogClose() {
    dialog.current?.close();
  }

  const path = usePathname();
  return (
    <dialog ref={dialog} className={styles["config-modal"]}>
      {path.startsWith("/scheduling") ? (
        <SchedulingConfig onCloseDialog={handleDialogClose} />
      ) : (
        <form method="dialog">
          <button>Close</button>
        </form>
      )}
    </dialog>
  );
});

export default ConfigModal;
