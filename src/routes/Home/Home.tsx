import type { FC } from "react";

import HomeProvider from "./context/home";
import useEmitter from "./hooks/use-emitter";

const Home: FC = () => {
  const emitter = useEmitter();

  return <HomeProvider emitter={emitter}>Home</HomeProvider>;
};

export default Home;
