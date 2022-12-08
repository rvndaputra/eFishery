import { NoUndefinedField } from "../types";

// ==============================
//  Normalized Types
// ==============================
export interface NormalizedOptionArea
  extends NoUndefinedField<OptionAreaQueryResponse> {}

export interface NormalizedOptionSize
  extends NoUndefinedField<OptionSizeQueryResponse> {}

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
  size: number | null;
}
