import type { Emitter } from "../../../helpers/emitter";
import type { FormFilter } from "./filter";

export type HomeEmitter = Emitter<HomeEventType>;

export type HomeEventType = {
  "@filter/submit": FormFilter;
  "@price_list/refetch": unknown;
  "@price_list/change_layout": string;
};
