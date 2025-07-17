import styles from "./header.module.css";
import { DATADISPLAY } from "./data.js";
import Image from "next/image";
import { usePathname } from "next/navigation";

import PowerFlowDetailsModal from "@/components/details/power-flow-details-modal";
import SchedulingDetailsModal from "@/components/details/scheduling-details-modal";
import { useContext, useRef } from "react";
import { CaseContext } from "@/store/case-data-context";

export default function Header({ handleClick, selectedValue, data }) {
  // get context
  const caseCtx = useContext(CaseContext);
  const isEnabled = caseCtx.enabled;

  function DataDisplay({ children, isSelected, ...props }) {
    return (
      <li
        className={
          isSelected
            ? styles["main-tab"] + " " + styles.active
            : styles["main-tab"]
        }
        {...props}
      >
        <Image src={children.image} alt={children.title} />
        <p>{children.title}</p>
      </li>
    );
  }

  const dialog = useRef();
  function handleDetailsClick() {
    dialog.current.open();
  }

  const path = usePathname();
  return (
    <>
      {path.startsWith("/power-flow") && (
        <PowerFlowDetailsModal ref={dialog} data={data} />
      )}
      {path.startsWith("/scheduling") && (
        <SchedulingDetailsModal ref={dialog} data={data} />
      )}
      <div className="row">
        <div className="col-9">
          <div className={styles["main-header"]}>
            <ul>
              {Object.keys(DATADISPLAY).map((objKey) => (
                <DataDisplay
                  key={objKey}
                  isSelected={selectedValue === objKey}
                  onClick={() => handleClick(objKey)}
                >
                  {DATADISPLAY[objKey]}
                </DataDisplay>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          <p className={styles.actions}>
            <button
              className={styles["details-flat"]}
              disabled={!isEnabled}
              onClick={handleDetailsClick}
            >
              Solution details
            </button>
            <button className={styles["run-button"]} disabled={!isEnabled}>
              Run
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
