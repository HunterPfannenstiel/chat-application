import { useLoading } from "components/providers/Loading/Loading";
import { use, useEffect, useRef, useState } from "react";
import { generateDatetimeOffset, getScrollHandler } from "utils/page-fetch";

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
  percentTillFetch = 20
) => {
  const page = useRef(initialPageNumber || 0);
  const [fetchPage, setFetchPage] = useState(false);
  const [pageContent, setPageContent] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(isInitialFetcher);
  const [isError, setIsError] = useState(false);
  const scrollHandler = useRef<any>(null);
  const isFetching = useRef(false);
  const initialFetch = useRef(generateDatetimeOffset());
  const scrollElement = useRef<HTMLElement | null>(null);
  const endOfContent = useRef(false);

  const setScrollEvent = (e: HTMLElement | null) => {
    if (e) {
      scrollElement.current = e;
      scrollHandler.current = getScrollHandler(
        e,
        percentTillFetch,
        isFetching,
        setFetchPage,
        endOfContent
      );
      scrollElement.current.addEventListener("scroll", scrollHandler.current);
    }
    if (!e && !!scrollElement.current) {
      scrollElement.current.removeEventListener(
        "scroll",
        scrollHandler.current
      );
      scrollElement.current = null;
      scrollHandler.current = null;
    }
  };

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

          if (pageContent && data.length > 0) {
            setPageContent([...pageContent, ...data]);
            page.current += 1;
          } else if (data.length > 0) {
            setPageContent(data);
            page.current += 1;
          }
          if (data.length < pageSize) {
            endOfContent.current = true;
          }
          setIsError(false);
        } catch (error) {
          if (!abortController.signal.aborted) {
            setIsError(true);
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
      (fetchDependency === undefined ||
        !!fetchDependency ||
        fetchDependency === "")
    ) {
      setIsLoading(true);
      initialFetch.current = generateDatetimeOffset();
      const initializer = async () => {
        try {
          const data = await pageFetcher(
            0,
            initialFetch.current,
            abortController,
            fetchDependency
          );
          setPageContent(data);
          if (data.length < pageSize) endOfContent.current = true;
          page.current = 1;
          setIsError(false);
        } catch (error) {
          if (!abortController.signal.aborted) {
            setIsError(true);
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

  const refetchInitial = () => {
    initialFetch.current = generateDatetimeOffset();
  };

  return {
    setScrollEvent,
    refetchInitial,
    pageContent,
    isLoading,
    isError,
    setPageContent,
  };
};

export default usePageFetch;
