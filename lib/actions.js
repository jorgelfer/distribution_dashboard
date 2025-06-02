"use server";
import { redirect } from "next/navigation";

export async function getDSS(formData) {
  const data = {
    "network-model": formData.get("network-model"),
    infile1: formData.get("infile1"),
  };
  const params = new URLSearchParams(data).toString();
  redirect(`/fetching?${params}`);
}
