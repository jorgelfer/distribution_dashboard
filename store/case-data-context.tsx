"use client";

import React, { useState } from "react";
import Case from "@/models/case";
import Config from "@/models/config";

type CaseContextObj = {
  case: Case;
  changeCase: (inputCase: Case) => void;
  config: Config;
  changeConfig: (inputConfig: Config) => void;
  enabled: boolean;
  changeEnabled: (enabled: boolean) => void;
  loggedIn: boolean;
  changeLoggedIn: (loggedIn: boolean) => void;
};

// createContext returns a React component.
export const CaseContext = React.createContext<CaseContextObj>({
  case: new Case("4Bus"), // default case
  changeCase: () => {},
  config: new Config("fbs", 100, false),
  changeConfig: () => {},
  enabled: false,
  changeEnabled: () => {},
  loggedIn: false,
  changeLoggedIn: () => {},
});

const CaseContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [enteredCase, setEnteredCase] = useState<Case>(new Case("4Bus"));

  const handleCaseChange = (inputCase: Case) => {
    setEnteredCase(inputCase);
  };

  const [enteredConfig, setEnteredConfig] = useState<Config>(
    new Config("fbs", 100, false)
  );

  const handleConfigChange = (inputConfig: Config) => {
    setEnteredConfig(inputConfig);
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const handleIsEnabled = (enabled: boolean) => {
    setIsEnabled(enabled);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const contextValue: CaseContextObj = {
    case: enteredCase,
    changeCase: handleCaseChange,
    config: enteredConfig,
    changeConfig: handleConfigChange,
    enabled: isEnabled,
    changeEnabled: handleIsEnabled,
    loggedIn: isLoggedIn,
    changeLoggedIn: handleIsLoggedIn,
  };

  return (
    <CaseContext.Provider value={contextValue}>
      {props.children}
    </CaseContext.Provider>
  );
};

export default CaseContextProvider;
