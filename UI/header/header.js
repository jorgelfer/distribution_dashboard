import styles from "./header.module.css";
import { DATADISPLAY } from "./data.js";
import Image from "next/image";
import { usePathname } from "next/navigation";

import PowerFlowDetailsModal from "@/components/details/power-flow-details-modal";
import SchedulingDetailsModal from "@/components/details/scheduling-details-modal";
import { useContext, useRef } from "react";
import { CaseContext } from "@/store/case-data-context";

import { renderPage } from "@/lib/actions";
import { useQueryClient } from "@tanstack/react-query";

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

export default function Header({ handleClick, selectedValue, data }) {
  // get query client
  const queryClient = useQueryClient();

  // get context
  const caseCtx = useContext(CaseContext);
  const isEnabled = caseCtx.enabled;

  // dialog reference
  const dialog = useRef();
  function handleDetailsClick() {
    dialog.current.open();
  }

  const path = usePathname();
  function handleRunClick() {
    // Optimistically update the cache

    console.log("data that will be updated");
    queryClient.setQueryData(
      ["opendss", caseCtx.case.networkModel, caseCtx.case.inFile1],
      (oldData) => {
        if (!oldData) return oldData;
        // oldData is the current cached data for 'myData'

        // keys from data not in oldData
        const keysToAdd = Object.keys(data).filter(
          (key) => !Object.prototype.hasOwnProperty.call(oldData, key)
        );

        const newKeys = Object.fromEntries(
          keysToAdd.map((key) => [key, data[key]])
        );

        // keep only entries in oldData that are also present in data
        const filterByUid = (oldArr = [], newArr = []) => {
          const newUids = new Set(newArr.map((item) => item.uid));
          return oldArr.filter((item) => newUids.has(item.uid));
        };

        return {
          ...oldData,
          ...newKeys,
          bus: filterByUid(oldData.bus, data.bus),
          branch: filterByUid(oldData.branch, data.branch),
          capacitor: filterByUid(oldData.capacitor, data.capacitor),
          load: filterByUid(oldData.load, data.load),
          // special handling for user-defined components
          // flex_load:
          //   "flex_load" in oldData && Array.isArray(data.flex_load)
          //     ? [...data.flex_load]
          //     : oldData.flex_load,
          // flex_gen:
          //   "flex_gen" in oldData && Array.isArray(data.flex_gen)
          //     ? [...data.flex_gen]
          //     : oldData.flex_gen,
          // dr_load:
          //   "dr_load" in oldData && Array.isArray(data.dr_load)
          //     ? [...data.dr_load]
          //     : oldData.dr_load,
          // battery:
          //   "battery" in oldData && Array.isArray(data.battery)
          //     ? [...data.battery]
          //     : oldData.battery,
        };
      }
    );

    renderPage(path);
  }

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
              aria-label="Open solution details"
            >
              Solution details
            </button>
            <button
              className={styles["run-button"]}
              disabled={!isEnabled}
              onClick={handleRunClick}
            >
              Run
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
