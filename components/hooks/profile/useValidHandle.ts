import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useValidHandle = (initialHandle?: string) => {
  const [handle, setHandle] = useState(initialHandle);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", handle || "h"],
    queryFn: validateHandler.bind(null, handle),
  });

  return { isValid: data, isLoading, isError, setHandle };
};

export default useValidHandle;

const validateHandler = async (handle: string | undefined) => {
  if (handle) {
    // const res = await fetch(`/api/verify?handle=${handle}`);
    // if (res.ok) {
    //   const data = await res.json();
    //   console.log("IS VALID", data.isValidHandle);
    //   return data.isValidHandle as boolean;
    // } else {
    //   throw new Error("Could not validate handle");
    // }
    console.log("CHECK HANDLE");
    return true;
  }
};
