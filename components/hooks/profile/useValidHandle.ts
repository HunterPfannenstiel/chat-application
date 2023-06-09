import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useValidHandle = (initialHandle?: string) => {
  const [handle, setHandle] = useState(initialHandle);
  const [fetchHandle, setFetchHandle] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["handle", fetchHandle],
    queryFn: validateHandler.bind(null, fetchHandle),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      if (handle && handle !== initialHandle) setFetchHandle(handle);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [handle]);

  return { isValid: data, isLoading, isError, setHandle };
};

export default useValidHandle;

const validateHandler = async (handle: string) => {
  if (handle) {
    const res = await fetch(`/api/user/verify?handle=${handle}`);
    if (res.ok) {
      const data = await res.json();
      return data.isValidHandle as boolean;
    } else {
      return false;
    }
  }
  return undefined;
};
