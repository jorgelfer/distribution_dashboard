"use server";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { getSession } from "next-auth/react";

import { redirect } from "next/navigation";

// const CaseContext = createContext(null);

export async function getDSS(formData) {
  const data = {
    "network-model": formData.get("network-model"),
    infile1: formData.get("infile1"),
  };
  const params = new URLSearchParams(data).toString();
  redirect(`/opendss?${params}`);
}
