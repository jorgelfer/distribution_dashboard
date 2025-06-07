import React, { useState, useContext } from "react";
import { infile1_map } from "@/models/case";
import Case from "@/models/case";

type CaseContextObj = {
  case: Case;
  changeCase: (identifier: string, value: string) => void;
  opendssData: object;
};

// createContext returns a React component.
export const CaseContext = React.createContext<CaseContextObj>({
  case: new Case("13Bus"),
  changeCase: () => {},
  opendssData: {},
});

const CaseContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [enteredCase, setEnteredCase] = useState<Case>(new Case("13Bus"));

  const handleCaseChange = (identifier: string, value: string) => {
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

  const contextValue: CaseContextObj = {
    case: enteredCase,
    changeCase: handleCaseChange,
    opendssData: {},
  };

  return (
    <CaseContext.Provider value={contextValue}>
      {props.children}
    </CaseContext.Provider>
  );
};

export default CaseContextProvider;
