import type {
  NormalizedOptionSize,
  OptionSizeQueryResponse,
} from "../../../model/options";

const normalizeOptSize = (data: OptionSizeQueryResponse[] | undefined) => {
  if (!data) return [];

  return data.reduce<NormalizedOptionSize[]>((acc, curr) => {
    if (!curr.size) return acc;

    acc.push({ size: curr.size });
    return acc;
  }, []);
};

export default normalizeOptSize;
