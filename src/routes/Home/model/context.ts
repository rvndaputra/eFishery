import type { ReactNode } from "react";
import type { HomeEmitter } from "./event";

export interface HomeProviderProps {
  children: ReactNode;
  emitter: HomeEmitter;
}

export type HomeContextType =
  | {
      emitter: HomeEmitter;
    }
  | undefined;
