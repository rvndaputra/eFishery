import { NoUndefinedField } from "../types";

// ==============================
//  Normalized Types
// ==============================
export interface NormalizedOptionArea {
  [key: string]: unknown;
  __raw: NoUndefinedField<OptionAreaQueryResponse>[];
}

export interface NormalizedOptionSize {
  size: number[];
  __raw: NoUndefinedField<OptionSizeQueryResponse>[];
}

// ==============================
//  Option Area Types
// ==============================
export interface OptionAreaQueryResponse {
  province: string | null;
  city: string | null;
}

// ==============================
//  Option Size Types
// ==============================
export interface OptionSizeQueryResponse {
  size: string | null;
}
