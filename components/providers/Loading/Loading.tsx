import useAnimateModal from "@hooks/animation/useAnimateModal";
import LoadingIcon from "@ui/Resuable/Loading/LoadingIcon";
import { ReactNode, createContext, useContext } from "react";

import { FunctionComponent } from "react";
const Loading = createContext({ toggle: () => {} });

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: FunctionComponent<LoadingProviderProps> = ({
  children,
}) => {
  const { playAnimation, showModal, toggle } = useAnimateModal(1000);
  return (
    <Loading.Provider value={{ toggle }}>
      <LoadingIcon playAnimation={playAnimation} showLoading={showModal} />
      {children}
    </Loading.Provider>
  );
};

export const useLoading = () => {
  return useContext(Loading);
};

export default LoadingProvider;
