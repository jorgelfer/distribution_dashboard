"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./scheduling-config.module.css";
import { CaseContext } from "@/store/case-data-context";
import Config from "@/models/config";

interface ChildProps {
  onCloseDialog: () => void;
}
const SchedulingConfig: React.FC<ChildProps> = ({ onCloseDialog }) => {
  const formulations = [
    { value: "fbs", label: "Foward Backward Sweep (Linearization)" },
    { value: "bfm_polar", label: "Branch Flow Model (Exact)" },
    { value: "bim_polar", label: "Bus Injection Model (Exact)" },
  ];
  const kVA_bases = [1, 10, 100];

  // handle change in configuration
  const router = useRouter();
  const [enteredConfig, setEnteredConf] = useState<Config>(
    new Config("fbs", 100, false)
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
    router.push("/scheduling");
  };

  return (
    <form className={styles.form} onSubmit={submitHandle}>
      <header className={styles.header}>
        <div className={styles.hero}>
          <h2>Scheduling Configuration</h2>
        </div>
      </header>

      <div className={styles.row}>
        <p>
          <label htmlFor="dropdown">Optimization Formulation</label>
          <select
            id="formulation"
            value={enteredConfig.formulation}
            onChange={(event) =>
              handleInputChange("formulation", event.target.value)
            }
          >
            {formulations.map((form) => (
              <option key={form.value} value={form.value}>
                {form.label}
              </option>
            ))}
          </select>
        </p>
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

export default SchedulingConfig;
