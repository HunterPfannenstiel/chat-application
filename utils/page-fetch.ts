import { MutableRefObject } from "react";

export const generateDatetimeOffset = () => {
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

export const getScrollHandler = (
  e: HTMLElement,
  percentTillFetch: number,
  isFetching: MutableRefObject<boolean>,
  setFetchPage: (page: boolean) => void,
  endOfContent: MutableRefObject<boolean>
) => {
  const containerHeight = e.clientHeight;
  const scrollEvent = () => {
    if (!endOfContent.current) {
      const bottomDistance = e.scrollHeight - e.scrollTop - containerHeight;
      if ((bottomDistance / containerHeight) * 100 <= percentTillFetch) {
        if (!isFetching.current) {
          setFetchPage(true);
          isFetching.current = true;
        }
      }
    }
  };
  return scrollEvent;
};
