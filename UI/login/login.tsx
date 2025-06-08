import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { infile1_map } from "@/models/case";
import { CaseContext } from "@/store/case-data-context";
import Case from "@/models/case";
import CaseFormSubmit from "@/components/case/case-form-submit";

const Login: React.FC = () => {
  const router = useRouter();
  const [enteredCase, setEnteredCase] = useState<Case>(new Case("13Bus"));

  const handleInputChange = (identifier: string, value: string) => {
    setEnteredCase((prevCase) => ({
      ...prevCase,
      [identifier]: value,
    }));

    // By default change inFile1 based on networkModel
    if (identifier === "networkModel") {
      setEnteredCase((prevCase) => ({
        ...prevCase,
        inFile1: infile1_map[value],
      }));
    }
  };

  const caseCtx = useContext(CaseContext);
  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();
    caseCtx.changeCase(enteredCase);

    router.push("/opendss");
  };

  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={submitHandle}>
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
                  handleInputChange("networkModel", event.target.value)
                }
                value={enteredCase.networkModel}
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
                  handleInputChange("inFile1", event.target.value)
                }
                value={enteredCase.inFile1}
              />
            </p>
          </div>
          <p className="actions">
            <CaseFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;
