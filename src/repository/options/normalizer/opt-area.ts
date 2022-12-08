import type {
  NormalizedOptionArea,
  OptionAreaQueryResponse,
} from "../../../model/options";

const normalizeOptArea = (data: OptionAreaQueryResponse[] | undefined) => {
  if (!data) return [];

  return data.reduce<NormalizedOptionArea>(
    (acc, curr) => {
      if (!curr.city || !curr.province) return acc;

      if (acc[curr.province]) {
        (acc[curr.province] as string[]).push(curr.city);
      } else {
        acc[curr.province] = [curr.city];
      }

      acc.__raw.push({ city: curr.city, province: curr.province });
      return acc;
    },
    { __raw: [] }
  );
};

export default normalizeOptArea;
