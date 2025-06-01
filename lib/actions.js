"use server";

// use server directive for connecting to a
// backend instead of sending an HTTP request
export async function getDSS(formData) {
  const dist_case = {
    "network-model": formData.get("network-model"),
    infile1: formData.get("infile1"),
  };
  console.log(dist_case);
}
