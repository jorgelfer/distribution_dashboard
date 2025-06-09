"use client";

import logoImg from "@/assets/icons/logo.png";
import Link from "next/link";
import styles from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
import { useContext, useRef, useState } from "react";
import { CaseContext } from "@/store/case-data-context";
import ConfigModal from "../configuration/config-modal";

export default function MainHeader() {
  // get context
  const caseCtx = useContext(CaseContext);
  const isEnabled = caseCtx.enabled;

  const dialog = useRef();
  function handleConfigClick() {
    dialog.current.open();
  }

  return (
    <>
      <ConfigModal ref={dialog} />
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={logoImg} alt="A distribution network icon" priority />
          Distribution System Dashboard
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/opendss">OpenDSS</NavLink>
            </li>
            <li>
              <NavLink href="/power_flow">FBS power flow</NavLink>
            </li>
            <li>
              <NavLink href="/scheduling">Scheduling</NavLink>
            </li>
          </ul>
        </nav>
        <p className="actions">
          <button disabled={!isEnabled} onClick={handleConfigClick}>
            Configuration
          </button>
        </p>
      </header>
    </>
  );
}
