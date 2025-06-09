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
    router.push("/scheduling");
  };

  return (
    <form className={styles.form} onSubmit={submitHandle}>
      <div>
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
          <label htmlFor="number">kVA_base</label>
          <input
            id="kVA_base"
            type="number"
            name="kVA_base"
            onChange={(event) =>
              handleInputChange("kVA_base", event.target.value)
            }
            value={enteredConfig.kVA_base}
          />
        </p>
      </div>

      <p className="actions">
        {/* <div> */}
        <button
          type="button"
          className={styles["button-flat"]}
          onClick={onCloseDialog}
        >
          Close
        </button>
        {/* </div> */}
        <button>Submit</button>
      </p>
    </form>
  );
};

export default SchedulingConfig;
