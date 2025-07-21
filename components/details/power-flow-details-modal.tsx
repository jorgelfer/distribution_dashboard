import styles from "./details-modal.module.css";
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import LineChartConv from "../charts/line-chart-conv";

interface ChildHandle {
  open: () => void;
  close: () => void;
}

interface SolutionData {
  error_it: number[]; // Replace 'any' with the actual type if known
  time_it: number[]; // Replace 'any' with the actual type if known
  mse: number[]; // Mean Squared Error, replace with actual type if needed
  // add other properties of 'solution' if needed
}

interface ChildProps {
  data: {
    solution: SolutionData;
    // add other properties of 'data' if needed
  };
}

const PowerFlowDetailsModal = forwardRef<ChildHandle, ChildProps>(
  (props, ref) => {
    const dialog = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialog.current?.showModal();
      },
      close: () => {
        dialog.current?.close();
      },
    }));

    var num_it: number = props.data["solution"]["error_it"].length;
    var last_error: number | undefined =
      props.data["solution"]["error_it"].at(-1);
    last_error = last_error && parseFloat((last_error * 100).toFixed(4));

    var conv_time: number = props.data["solution"]["time_it"].reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    conv_time = parseFloat(conv_time.toFixed(4));

    console.log(props.data.solution.mse);

    return (
      <dialog ref={dialog} className={styles["config-modal"]}>
        <div className="row">
          <div className="col-8">
            <LineChartConv data={props.data} />
          </div>
          <div className="col-4">
            <h2>Solution </h2>
            <p>
              The FBS algorithm converged in{" "}
              <strong>{conv_time} seconds </strong> and{" "}
              <strong>{num_it} iterations</strong>
            </p>
            <p>
              The error between iterations converged to{" "}
              <strong>{last_error} %</strong>
            </p>
          </div>
        </div>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default PowerFlowDetailsModal;
