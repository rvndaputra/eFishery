import type { NoUndefinedField, OptionalReqParams, Scalars } from "../types";

// ==============================
//  Normalized Types
// ==============================
export interface NormalizedFishPriceList
  extends NoUndefinedField<FishPriceListQueryResponse> {}

// ==============================
//  Query Types
// ==============================
export interface FishPriceListQueryResponse {
  uuid: string | null;
  komoditas: string | null;
  area_provinsi: string | null;
  area_kota: string | null;
  size: string | null;
  price: string | null;
  tgl_parsed: Scalars["Date"] | null;
  timestamp: string | null;
}

export interface FishPriceListQueryVariables extends OptionalReqParams {}
