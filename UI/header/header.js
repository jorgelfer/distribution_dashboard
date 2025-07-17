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

export default function Header({ handleClick, selectedValue, data }) {
  // get query client
  const queryClient = useQueryClient();

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

  const getActiveQueryKeys = () => {
    // Access the queryCache from the queryClient
    const queryCache = queryClient.getQueryCache();

    // Use getAll() to get an array of all queries in the cache
    const allQueries = queryCache.getAll();

    // Map over the queries to extract their query keys
    const queryKeys = allQueries.map((query) => query.queryKey);

    return queryKeys;
  };

  const path = usePathname();
  function handleRunClick() {
    // Optimistically update the cache
    queryClient.setQueryData(
      ["opendss", caseCtx.case.networkModel, caseCtx.case.inFile1],
      (oldData) => {
        // oldData is the current cached data for 'myData'
        return data;
      }
    );

    // const keys = getActiveQueryKeys();
    // console.log("Available Query Keys:", keys);
    // console.log("key of interest", [
    //   "opendss",
    //   caseCtx.case.networkModel,
    //   caseCtx.case.inFile1,
    // ]);
    // alert("Check the console for the list of query keys!");

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
