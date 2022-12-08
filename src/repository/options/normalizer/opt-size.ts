import type {
  NormalizedOptionSize,
  OptionSizeQueryResponse,
} from "../../../model/options";

const normalizeOptSize = (data: OptionSizeQueryResponse[] | undefined) => {
  if (!data) return [];

  return data.reduce<NormalizedOptionSize>(
    (acc, curr) => {
      if (!curr.size) return acc;

      acc.size.push(parseInt(curr.size));
      acc.__raw.push({ size: curr.size });

      return acc;
    },
    { size: [], __raw: [] }
  );
};

export default normalizeOptSize;
