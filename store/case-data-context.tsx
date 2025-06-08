"use client";

import React, { useState } from "react";
import Case from "@/models/case";
import Config from "@/models/config";

type CaseContextObj = {
  case: Case;
  changeCase: (inputCase: Case) => void;
  config: Config;
  changeConfig: (inputConfig: Config) => void;
};

// createContext returns a React component.
export const CaseContext = React.createContext<CaseContextObj>({
  case: new Case("13Bus"),
  changeCase: () => {},
  config: new Config("fbs", 100),
  changeConfig: () => {},
});

const CaseContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [enteredCase, setEnteredCase] = useState<Case>(new Case("13Bus"));

  const handleCaseChange = (inputCase: Case) => {
    setEnteredCase(inputCase);
  };

  const [enteredConfig, setEnteredConfig] = useState<Config>(
    new Config("fbs", 100)
  );

  const handleConfigChange = (inputConfig: Config) => {
    setEnteredConfig(inputConfig);
  };

  const contextValue: CaseContextObj = {
    case: enteredCase,
    changeCase: handleCaseChange,
    config: enteredConfig,
    changeConfig: handleConfigChange,
  };

  return (
    <CaseContext.Provider value={contextValue}>
      {props.children}
    </CaseContext.Provider>
  );
};

export default CaseContextProvider;
