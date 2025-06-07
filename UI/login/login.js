import React from "react";
import styles from "./login.module.css";
import CaseFormSubmit from "@/components/case/case-form-submit";
import { getDSS } from "@/lib/actions";
import { infile1_map } from "@/models/case";

export default function Login({ values, onEnteredValues }) {
  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} action={getDSS}>
          <header className={styles.header}>
            <div className={styles.hero}>
              <h1>Case definition</h1>
            </div>
          </header>
          <div className={styles.row}>
            <p>
              <label htmlFor="dropdown">Network Model</label>
              <select
                id="network-model"
                name="network-model"
                onChange={(event) =>
                  onEnteredValues("networkModel", event.target.value)
                }
                value={values.networkModel}
              >
                {Object.keys(infile1_map).map((network) => (
                  <option key={network} value={network}>
                    {network}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="text">InFile1</label>
              <input
                id="infile1"
                type="text"
                name="infile1"
                onChange={(event) =>
                  onEnteredValues("inFile1", event.target.value)
                }
                value={values.inFile1}
              />
            </p>
          </div>
          <p className={styles.actions}>
            <CaseFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
