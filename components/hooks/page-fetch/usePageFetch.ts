import { useEffect, useRef, useState } from "react";

const usePageFetch = (
  pageFetcher: (page: number) => Promise<any>,
  isInitialFetcher: boolean,
  useBodyToScroll: boolean,
  fetchDependency?: any,
  percentTillFetch = 20
) => {
  const page = useRef(1);
  const [fetchPage, setFetchPage] = useState(false);
  const [pageContent, setPageContent] = useState<any[]>();
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
          if (pageContent && data) {
            setPageContent([...pageContent, data]);
            page.current += 1;
          } else if (data) {
            setPageContent(data);
            page.current += 1;
          }
        }
      };
    }
  }, [fetchPage]);

  useEffect(() => {
    if (isInitialFetcher && !!fetchDependency) {
      console.log(fetchDependency);
      const initializer = async () => {
        const data = await pageFetcher(0);
        setPageContent(data);
        page.current = 1;
      };
      initializer();
    }
  }, [fetchDependency]);

  useEffect(() => {
    const scrollingElem = useBodyToScroll
      ? window.document.body
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
      // if (useBodyToScroll) {
      //   scrollingElem.onscroll = scrollEvent;
      // } else {
      scrollingElem.addEventListener("scroll", scrollEvent);
      // }
      console.log({ scrollingElem });
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

  return { scrollElement, resetPageContent, pageContent };
};

export default usePageFetch;
