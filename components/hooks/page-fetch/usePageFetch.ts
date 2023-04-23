import { useEffect, useRef, useState } from "react";

const usePageFetch = (
  pageFetcher: (page: number) => Promise<any>,
  isInitialFetcher: boolean,
  useBodyToScroll: boolean,
  percentTillFetch = 20
) => {
  const page = useRef(1);
  const [fetchPage, setFetchPage] = useState(false);
  const [pageContent, setPageContent] = useState<any[]>([]);
  const isFetching = useRef(false);
  const initialFetch = useRef(new Date());
  const scrollElement = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (fetchPage) {
      setFetchPage(false);
      async () => {
        const res = await pageFetcher(page.current);
        if (res.ok) {
          const data = await res.json();
          setPageContent([...pageContent, data]);
        }
      };
    }
  }, [fetchPage]);

  useEffect(() => {
    if (isInitialFetcher) {
      async () => {
        const res = await pageFetcher(0);
        if (res.ok) {
          const data = await res.json();
          setPageContent(data);
        }
      };
    }
  }, []);

  useEffect(() => {
    const scrollingElem = useBodyToScroll
      ? document.body
      : scrollElement.current;
    let scrollEvent: any;
    if (scrollingElem) {
      const containerHeight = scrollingElem.clientHeight;
      const sHeight = scrollingElem.scrollHeight;

      scrollEvent = () => {
        const bottomDistance =
          sHeight - scrollingElem.scrollTop - containerHeight;
        if ((bottomDistance / containerHeight) * 100 <= percentTillFetch) {
          if (!isFetching.current) {
            setFetchPage(true);
            console.log("FETCH");
            fetch(
              `/api/test?initialFetch=${initialFetch.current.toLocaleString()}&page=${
                page.current
              }`
            );
            isFetching.current = true;
            setTimeout(() => {
              isFetching.current = false;
              page.current = page.current + 1;
              console.log("Done fetching!");
            }, 5000);
          }
        }
      };
      if (useBodyToScroll) {
        scrollingElem.onscroll = scrollEvent;
      } else {
        scrollingElem.addEventListener("scroll", scrollEvent);
      }
    }

    return () => {
      if (!useBodyToScroll)
        scrollingElem?.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollElement]);

  const resetPageContent = () => {
    page.current = 1;
    setPageContent([]);
  };

  return { scrollElement, resetPageContent };
};

export default usePageFetch;
