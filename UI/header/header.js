import styles from "./header.module.css";
import { DATADISPLAY } from "./data.js";
import Image from "next/image";
import { usePathname } from "next/navigation";

import PowerFlowDetailsModal from "@/components/details/power-flow-details-modal";
import SchedulingDetailsModal from "@/components/details/scheduling-details-modal";
import { useRef } from "react";

export default function Header({ handleClick, selectedValue, data }) {
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
        <div className={path.startsWith("/opendss") ? "col-10 " : "col-9"}>
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
        {!path.startsWith("/opendss") && (
          <div className="col-3">
            <p className={styles.actions}>
              <button
                className={styles["details-flat"]}
                onClick={handleDetailsClick}
              >
                Solution details
              </button>
              <button className={styles["run-button"]}>Run</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
