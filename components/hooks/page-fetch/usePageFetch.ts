import { useEffect, useRef, useState } from "react";

const usePageFetch = (
  pageFetcher: (page: number, date: string, dependency?: any) => Promise<any>,
  isInitialFetcher: boolean,
  pageSize: number,

  fetchDependency?: any,
  percentTillFetch = 1
) => {
  const page = useRef(0);
  const [fetchPage, setFetchPage] = useState(false);
  const [pageContent, setPageContent] = useState<any[]>();
  const isFetching = useRef(false);
  const initialFetch = useRef(generateDatetimeOffset());
  const scrollElement = useRef<HTMLUListElement>(null);
  const endOfContent = useRef(false);

  useEffect(() => {
    if (fetchPage) {
      setFetchPage(false);
      const pageFetch = async () => {
        const data = await pageFetcher(
          page.current,
          initialFetch.current,
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
        if (data.length < pageSize) endOfContent.current = true;
        isFetching.current = false;
      };
      pageFetch();
    }
  }, [fetchPage]);

  useEffect(() => {
    if (
      isInitialFetcher &&
      (fetchDependency === undefined || !!fetchDependency)
    ) {
      console.log(fetchDependency);
      const initializer = async () => {
        const data = await pageFetcher(
          0,
          initialFetch.current,
          fetchDependency
        );
        setPageContent(data);
        page.current = 1;
      };
      initializer();
    }
  }, [fetchDependency]);

  useEffect(() => {
    const scrollingElem = scrollElement.current;
    let scrollEvent: any;
    if (scrollingElem) {
      const containerHeight = scrollingElem.clientHeight;
      scrollEvent = () => {
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

  return { scrollElement, resetPageContent, pageContent };
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
  const hours = +locale.slice(0, locale.indexOf(":")) + addValue;
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
