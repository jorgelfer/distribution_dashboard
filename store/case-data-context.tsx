"use client";

import React, { useState } from "react";
import Case from "@/models/case";

type CaseContextObj = {
  case: Case;
  changeCase: (inputCase: Case) => void;
};

// createContext returns a React component.
export const CaseContext = React.createContext<CaseContextObj>({
  case: new Case("13Bus"),
  changeCase: () => {},
});

const CaseContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [enteredCase, setEnteredCase] = useState<Case>(new Case("13Bus"));

  const handleCaseChange = (inputCase: Case) => {
    setEnteredCase(inputCase);
  };

  const contextValue: CaseContextObj = {
    case: enteredCase,
    changeCase: handleCaseChange,
  };

  return (
    <CaseContext.Provider value={contextValue}>
      {props.children}
    </CaseContext.Provider>
  );
};

export default CaseContextProvider;
