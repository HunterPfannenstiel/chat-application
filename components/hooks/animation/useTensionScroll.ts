import { useEffect } from "react";

const useTensionScroll = (scrollRef: { current: HTMLElement | null }) => {
  useEffect(() => {
    let handleScroll: any;
    if (scrollRef.current) {
      const scrollElem = scrollRef.current;
      handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollElem;
        console.log({ scrollTop, scrollHeight, clientHeight });
        if (scrollTop + clientHeight >= scrollHeight) {
          console.log("tension");
          const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
          const tension = Math.min(distanceToBottom * 0.1, 100);
          scrollElem.style.transform = `translateY(-${tension}px)`;
        } else {
          scrollElem.style.transform = "none";
        }
      };
      console.log("Apply handle scroll", scrollElem);
      scrollElem.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);
};

export default useTensionScroll;
