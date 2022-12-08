import type { Emitter } from "../../../helpers/emitter";

export type HomeEmitter = Emitter<HomeEventType>;

export type HomeEventType = {
  "@price_list/refetch": unknown;
};
