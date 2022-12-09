import type {
  NormalizedOptionSize,
  OptionSizeQueryResponse,
} from "../../../model/options";

const normalizeOptSize = (
  data: OptionSizeQueryResponse[] | undefined
): NormalizedOptionSize => {
  if (!data) return { size: [], __raw: [] };

  return data
    .sort((a, b) => parseInt(a.size || "") - parseInt(b.size || ""))
    .reduce<NormalizedOptionSize>(
      (acc, curr) => {
        if (!curr.size) return acc;

        acc.size.push(curr.size);
        acc.__raw.push({ size: curr.size });

        return acc;
      },
      { size: [], __raw: [] }
    );
};

export default normalizeOptSize;
