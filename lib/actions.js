"use server";
// import { fetchOpenDSSData } from "@/data/https";
import { redirect } from "next/navigation";
// import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchOpenDSSData } from "@/data/https";
// use server directive for connecting to a
// backend instead of sending an HTTP request
export async function getDSS(formData) {
  // const networkModel = formData.get("network-model");
  // const inFile1 = formData.get("infile1");
  const data = {
    "network-model": formData.get("network-model"),
    infile1: formData.get("infile1"),
  };
  const params = new URLSearchParams(data).toString();
  redirect(`/fetching?${params}`);
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["posts", 10],
  //   queryFn: () => fetchPosts(10),
  // });

  // let qstsURL = `http://127.0.0.1:5000/qsts/${networkModel}/${inFile1}`;
  // let { data, isPending, isError, error } = useQuery({
  //   queryKey: ["qstsData", networkModel, inFile1],
  //   queryFn: () => fetchOpenDSSData(qstsURL),
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  //   onSuccess: (data) => {
  //     // Process the data here
  //     console.log("Data fetched successfully:", data);
  //   },
  // });

  // console.log(data);
}
