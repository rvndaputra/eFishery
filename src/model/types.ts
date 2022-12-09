// ==============================
//    Utils Types
// ==============================
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type Scalars = {
  Date: unknown;
  Float: number;
};

// ==============================
//    Stein Types
// ==============================
export interface OptionalReqParams {
  limit?: number;
  offset?: number;
}
