import type {
  NormalizedOptionArea,
  OptionAreaQueryResponse,
} from "../../../model/options";

const normalizeOptArea = (data: OptionAreaQueryResponse[] | undefined) => {
  if (!data) return [];

  return data.reduce<NormalizedOptionArea[]>((acc, curr) => {
    if (!curr.city || !curr.province) return acc;

    acc.push({ city: curr.city, province: curr.province });
    return acc;
  }, []);
};

export default normalizeOptArea;
