import type { FC } from "react";
import { createContext, useContext, useMemo } from "react";

import useAllOptions from "../../../repository/options/use-all-options";

import useEmitter from "../hooks/use-emitter";
import type { HomeContextType, HomeProviderProps } from "../model";

const HomeContext = createContext<HomeContextType>(undefined);

const HomeProvider: FC<HomeProviderProps> = (props) => {
  const { children, emitter } = props;

  const mitt = useEmitter(emitter);
  const options = useAllOptions();

  const value = useMemo(() => {
    return {
      emitter: mitt,
      options: options,
    };
  }, [mitt, options]);

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }

  return context;
};

export default HomeProvider;
export { HomeProvider, useHomeContext };
