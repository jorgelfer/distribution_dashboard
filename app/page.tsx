"use client";

import styles from "./page.module.css";
import Link from "next/link";
// import Header from "@/components/header";
// import Todos from "@/components/todos";
// import NewTodo from "@/components/newTodo";
// import TodosContextProvider from "@/store/todos-context";
import Login from "@/UI/login";

const infile1_map = {
  "3Bus": "case3_unbalanced.dss",
  "4Bus": "4Bus-DY-reg.dss",
  "13Bus": "IEEE13Nodeckt.dss",
  "123Bus": "IEEE123Master.dss",
  secondary: "Master.dss",
  "8500Node": "Master-unbal.dss",
  "8500Node_120": "Master-unbal.dss",
  "8500Node_1ph": "Master.dss",
  "8500Node_441": "Master.dss",
  "8500Node_510": "Master-unbal.dss",
  center_tapped: "center_tap_xfmr.dss",
};

export default function Home() {
  // const [isCaseSubmitted, setCaseSubmitted] = useState(false);

  // function handleSubmitted() {
  //   setCaseSubmitted((curIsCaseSubmitted) => !curIsCaseSubmitted);
  // }

  // const [enteredCase, setEnteredCase] = useState({
  //   networkModel: "13Bus",
  //   inFile1: "IEEE13Nodeckt.dss",
  // });

  // const queryClient = new QueryClient();

  // function handleInputChange(identifier, value) {
  //   setEnteredCase((prevCase) => ({
  //     ...prevCase,
  //     [identifier]: value,
  //   }));
  //   // By default inFile1 based on networkModel
  //   if (identifier === "networkModel") {
  //     setEnteredCase((prevCase) => ({
  //       ...prevCase,
  //       inFile1: infile1_map[value],
  //     }));
  //   }
  // }

  return (
    <>
      <main>{/* <Login /> */}</main>
    </>
  );
}
