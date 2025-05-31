import React from "react";
import styles from "./login.module.css";
// import getDSS from "@/lib/actions";

// ({ values, onEnteredValues, onSubmitted })
const networks = [
  { value: "3Bus", label: "3Bus", inFile1: "3Bus-DY.dss" },
  { value: "4Bus", label: "4Bus", inFile1: "4Bus-DY-reg.dss" },
  { value: "123Bus", label: "123Bus", inFile1: "IEEE123Master.dss" },
  { value: "secondary", label: "secondary", inFile1: "Master.dss" },
  { value: "8500Node", label: "8500Node", inFile1: "Master-unbal.dss" },
  { value: "8500Node_120", label: "8500Node_120", inFile1: "Master-unbal.dss" },
  { value: "8500Node_1ph", label: "8500Node_1ph", inFile1: "Master.dss" },
  { value: "8500Node_441", label: "8500Node_441", inFile1: "Master.dss" },
  { value: "8500Node_510", label: "8500Node_510", inFile1: "Master-unbal.dss" },
  {
    value: "center_tapped",
    label: "center_tapped",
    inFile1: "center_tap_xfmr.dss",
  },
];

export default function Login({ values, onEnteredValues, onSubmitted }) {
  return (
    <form className={styles.form}>
      <h2 className={styles["login-header"]}>CASE DEFINITION</h2>
      <div className={styles["control-row"]}>
        <div className={styles["control no-margin"]}>
          <label htmlFor="dropdown">Network Model</label>
          <select id="network-model">
            <option value="13Bus">13 Bus</option>
            {networks.map((network) => (
              <option key={network.value} value={network.value}>
                {network.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["control no-margin"]}>
          <label htmlFor="text">InFile1</label>
          <input id="infile1" type="text" name="infile1" />
        </div>
      </div>
      <p className={styles["form-actions"]}>
        <button type="reset" className={styles["login-button button-flat"]}>
          Reset
        </button>
        <button className={styles["login-button"]}>Run qsts</button>
      </p>
    </form>
  );
}
