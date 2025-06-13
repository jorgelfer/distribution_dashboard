import styles from "./details-modal.module.css";
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import PowerFlowDetails from "./power-flow-details";
import LineChartConv from "../charts/line-chart-conv";

interface ChildHandle {
  open: () => void;
  close: () => void;
}

interface ChildProps {
  data: {};
}

const DetailsModal = forwardRef<ChildHandle, ChildProps>((props, ref) => {
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

  return (
    <dialog ref={dialog} className={styles["config-modal"]}>
      <LineChartConv data={props.data} />
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default DetailsModal;
