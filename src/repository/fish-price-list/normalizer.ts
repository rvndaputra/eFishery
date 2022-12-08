import type {
  FishPriceListQueryResponse,
  NormalizedFishPriceList,
} from "../../model/fish-price-list";

const normalize = (data: FishPriceListQueryResponse[] | undefined) => {
  if (!data) return [];

  return data.reduce<NormalizedFishPriceList[]>((acc, curr) => {
    if (!curr || !curr.uuid) return acc;

    acc.push({
      area_kota: curr.area_kota || "",
      area_provinsi: curr.area_provinsi || "",
      komoditas: curr.komoditas || "",
      price: curr.price || "0",
      size: curr.size || "0",
      tgl_parsed: curr.tgl_parsed || "",
      timestamp: curr.timestamp || "",
      uuid: curr.uuid || "0",
    });

    return acc;
  }, []);
};

export default normalize;
