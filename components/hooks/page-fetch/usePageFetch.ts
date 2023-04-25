import { useEffect, useRef, useState } from "react";

const usePageFetch = (
  pageFetcher: (
    page: number,
    date: string,
    abortController: AbortController,
    dependency?: any
  ) => Promise<any>,
  isInitialFetcher: boolean,
  pageSize: number,
  fetchDependency?: any,
  initialPageNumber?: number,
  percentTillFetch = 1
) => {
  const page = useRef(initialPageNumber || 0);
  const [fetchPage, setFetchPage] = useState(false);
  const [pageContent, setPageContent] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(isInitialFetcher);
  const [isError, setIsError] = useState(false);
  const isFetching = useRef(false);
  const initialFetch = useRef(generateDatetimeOffset());
  const scrollElement = useRef<HTMLUListElement>(null);
  const endOfContent = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (fetchPage) {
      setFetchPage(false);
      setIsLoading(true);
      const pageFetch = async () => {
        try {
          const data = await pageFetcher(
            page.current,
            initialFetch.current,
            abortController,
            fetchDependency
          );
          console.log(`Fetching page ${page.current}`);

          console.log("fetch data", data);
          if (pageContent && data.length > 0) {
            setPageContent([...pageContent, ...data]);
            page.current += 1;
          } else if (data.length > 0) {
            setPageContent(data);
            page.current += 1;
          }
          if (data.length < pageSize) {
            console.log("LOCK");
            endOfContent.current = true;
          }
          setIsError(false);
        } catch (error) {
          if (!abortController.signal.aborted) {
            setIsError(true);
          } else {
            console.log("Aborted Fetch!");
          }
        } finally {
          isFetching.current = false;
          setIsLoading(false);
        }
      };
      pageFetch();
    }
    return () => {
      // if (!abortController.signal.aborted) abortController.abort();
    };
  }, [fetchPage]);

  useEffect(() => {
    const abortController = new AbortController();
    if (
      isInitialFetcher &&
      (fetchDependency === undefined || !!fetchDependency)
    ) {
      setIsLoading(true);
      const initializer = async () => {
        try {
          const data = await pageFetcher(
            0,
            initialFetch.current,
            abortController,
            fetchDependency
          );
          setPageContent(data);
          page.current = 1;
          setIsError(false);
        } catch (error) {
          if (!abortController.signal.aborted) {
            setIsError(true);
          } else {
            console.log("Aborted Fetch!");
          }
        } finally {
          setIsLoading(false);
        }
      };
      initializer();
    }
    return () => {
      if (endOfContent.current) endOfContent.current = false;
      abortController.abort();
    };
  }, [fetchDependency]);

  useEffect(() => {
    const scrollingElem = scrollElement.current;
    let scrollEvent: any;
    console.log(scrollingElem);
    if (scrollingElem) {
      const containerHeight = scrollingElem.clientHeight;
      scrollEvent = () => {
        console.log(endOfContent.current);
        if (!endOfContent.current) {
          const bottomDistance =
            scrollingElem.scrollHeight -
            scrollingElem.scrollTop -
            containerHeight;
          if ((bottomDistance / containerHeight) * 100 <= percentTillFetch) {
            if (!isFetching.current) {
              setFetchPage(true);
              console.log("FETCH");
              isFetching.current = true;
            }
          }
        }
      };

      scrollingElem.addEventListener("scroll", scrollEvent);
    }

    return () => {
      scrollingElem?.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollElement.current]);

  const resetPageContent = () => {
    page.current = 1;
    setPageContent([]);
  };

  return { scrollElement, resetPageContent, pageContent, isLoading, isError };
};

const generateDatetimeOffset = () => {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const offsetSign = timezoneOffset < 0 ? "+" : "-";
  const locale = date.toLocaleTimeString();
  const timeOfDay = locale.slice(-2);
  let addValue = 0;
  if (timeOfDay === "PM") addValue = 12;
  let hours = +locale.slice(0, locale.indexOf(":"));
  if (hours === 12) {
    if (addValue === 0) {
      hours = 0;
    }
  } else {
    hours += addValue;
  }
  const time = hours + ":" + locale.slice(locale.indexOf(":") + 1, 7);
  const day = date.toLocaleDateString().replace(/\//g, "-");
  let dateTimeOffset =
    day + " " + time + offsetSign + pad(offsetHours) + ":" + "00";
  dateTimeOffset = dateTimeOffset.replace("T", " ");
  dateTimeOffset = dateTimeOffset.replace("Z", " ");
  return dateTimeOffset;
};

const pad = (val: number) => {
  return val.toString().padStart(2, "0");
};

export default usePageFetch;
