import type {
  NormalizedOptionArea,
  OptionAreaQueryResponse,
} from "../../../model/options";

const normalizeOptArea = (
  data: OptionAreaQueryResponse[] | undefined
): NormalizedOptionArea => {
  if (!data) return { area: {}, cities: [], provinces: [], __raw: [] };

  return data.reduce<NormalizedOptionArea>(
    (acc, curr) => {
      if (!curr.city || !curr.province) return acc;

      if (acc.area[curr.province]) {
        (acc.area[curr.province] as string[]).push(curr.city);
      } else {
        acc.provinces.push(curr.province);
        acc.cities.push(curr.city);
        acc.area[curr.province] = [curr.city];
      }

      acc.__raw.push({ city: curr.city, province: curr.province });
      return acc;
    },
    { area: {}, cities: [], provinces: [], __raw: [] }
  );
};

export default normalizeOptArea;
