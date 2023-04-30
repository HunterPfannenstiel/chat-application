import useAnimateModal from "@hooks/animation/useAnimateModal";
import LoadingIcon from "@ui/Resuable/Loading/LoadingIcon";
import { ReactNode, createContext, useContext } from "react";

import { FunctionComponent } from "react";
const Loading = createContext({ toggle: async () => {} });

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: FunctionComponent<LoadingProviderProps> = ({
  children,
}) => {
  const animationTime = 1000;
  const { playAnimation, showModal, toggle } = useAnimateModal(animationTime);
  const toggleLoading = () => {
    toggle();
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, animationTime);
    });
  };
  return (
    <Loading.Provider value={{ toggle: toggleLoading }}>
      <LoadingIcon
        playAnimation={playAnimation}
        showLoading={showModal}
        closeTime={animationTime}
        openTime={1500}
      />
      {children}
    </Loading.Provider>
  );
};

export const useLoading = () => {
  return useContext(Loading);
};

export default LoadingProvider;
