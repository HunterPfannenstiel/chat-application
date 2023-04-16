import { useEffect } from "react";

const useTensionScroll = () => {
  useEffect(() => {
    document.body.onscroll = (e) => {
      console.log(e.target);
    };
  }, []);
};

export default useTensionScroll;
