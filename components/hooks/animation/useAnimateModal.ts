import { useEffect, useState } from "react";

const useAnimateModal = (animationTime: number) => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [handle, setHandle] = useState(false);
  const toggleModal = () => {
    setHandle((prevState) => !prevState);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (handle) {
      //If we need to change state
      if (playAnimation) {
        //Modal is being shut, needs to open
        setPlayAnimation(false); //'ShowModal' is still true
        setHandle(false);
      } else if (showModal) {
        //Modal is open, needs to be shut
        setPlayAnimation(true);
        timer = setTimeout(() => {
          setShowModal(false);
          setHandle(false);
          setPlayAnimation(false);
        }, animationTime);
      } else {
        //Modal is closed, needs to be opened
        setShowModal(true);
        setHandle(false);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [handle]);

  return { toggleModal, showModal, playAnimation };
};

export default useAnimateModal;
