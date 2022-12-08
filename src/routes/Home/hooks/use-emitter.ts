import { useRef } from "react";

import mitt from "../../../helpers/emitter";
import { HomeEmitter, HomeEventType } from "../model";

/**
 * @function useEmitter
 * @param {HomeEmitter} emitter
 */
const useEmitter = (emitter?: HomeEmitter) => {
  const _emmiter = useRef(emitter ?? mitt<HomeEventType>());

  return _emmiter.current;
};

export default useEmitter;
