"use client";

import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./scheduling-config.module.css";
import { CaseContext } from "@/store/case-data-context";
import Config from "@/models/config";

interface ChildProps {
  onCloseDialog: () => void;
}
const PowerFlowConfig: React.FC<ChildProps> = ({ onCloseDialog }) => {
  //   const initializations = [
  //     { value: "opendss", label: "OpenDSS voltage start" },
  //     { value: "flat", label: "Flat voltage start" },
  //   ];
  const kVA_bases = [1, 10, 100];

  // handle change in configuration
  const router = useRouter();
  const [enteredConfig, setEnteredConf] = useState<Config>(
    new Config("fbs", 100)
  );

  function handleInputChange(identifier: string, value: string | number) {
    setEnteredConf((prevCase) => ({
      ...prevCase,
      [identifier]: value,
    }));
  }

  const caseCtx = useContext(CaseContext);
  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();
    caseCtx.changeConfig(enteredConfig);
    onCloseDialog();
    router.push("/power-flow");
  };

  return (
    <form className={styles.form} onSubmit={submitHandle}>
      <header className={styles.header}>
        <div className={styles.hero}>
          <h2>Power Flow Configuration</h2>
        </div>
      </header>

      <div className={styles.row}>
        <p>
          <label htmlFor="dropdown">kVA_base</label>
          <select
            id="kVA_base"
            value={enteredConfig.kVA_base}
            onChange={(event) =>
              handleInputChange("kVA_base", event.target.value)
            }
          >
            {kVA_bases.map((kVA_base) => (
              <option key={kVA_base} value={kVA_base}>
                {kVA_base}
              </option>
            ))}
          </select>
        </p>
      </div>

      <p className="actions">
        <button type="button" className="button-flat" onClick={onCloseDialog}>
          Close
        </button>
        <button className="submit-button">Submit</button>
      </p>
    </form>
  );
};

export default PowerFlowConfig;
