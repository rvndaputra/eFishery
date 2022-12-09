import type { ReactNode } from "react";
import type { AllOptionsRepository } from "../../../model/options";
import type { HomeEmitter } from "./event";

export interface HomeProviderProps {
  children: ReactNode;
  emitter: HomeEmitter;
}

export type HomeContextType =
  | {
      emitter: HomeEmitter;
      options: AllOptionsRepository;
    }
  | undefined;
