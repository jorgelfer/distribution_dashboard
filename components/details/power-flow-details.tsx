"use client";

import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./scheduling-config.module.css";
import { CaseContext } from "@/store/case-data-context";
import Config from "@/models/config";

interface ChildProps {
  onCloseDialog: () => void;
}
const PowerFlowDetails: React.FC<ChildProps> = ({ onCloseDialog }) => {
  // handle change in configuration
  const router = useRouter();
  const [enteredConfig, setEnteredConf] = useState<Config>(
    new Config("fbs", 100)
  );

  return <></>;
};

export default PowerFlowDetails;
