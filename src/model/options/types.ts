import { NoUndefinedField } from "../types";

// ==============================
//  Repository Types
// ==============================
export interface AllOptionsRepository {
  data: {
    area: NormalizedOptionArea;
    size: NormalizedOptionSize;
  };
  error: unknown;
  loading: boolean;
}

// ==============================
//  Normalized Types
// ==============================
export interface NormalizedOptionArea {
  area: {
    [key: string]: unknown;
  };
  cities: string[];
  provinces: string[];
  __raw: NoUndefinedField<OptionAreaQueryResponse>[];
}

export interface NormalizedOptionSize {
  size: string[];
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
