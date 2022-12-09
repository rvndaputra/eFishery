import { Fragment, useCallback, useEffect, useState } from "react";

import type { FishPriceListQueryVariables } from "../../../../model/fish-price-list";
import { useFishPriceList } from "../../../../repository/fish-price-list";

import { useHomeContext } from "../../context/home";
import { FormFilter } from "../../model/filter";

import PriceListTableView from "./TableView/Loadable";
import PriceListCardView from "./CardView/Loadable";

const List = () => {
  const { emitter } = useHomeContext();

  const [filter, setFilter] = useState<FishPriceListQueryVariables["search"]>();
  const [segment, setSegment] = useState<"list" | "card">("list");

  const { data, loading } = useFishPriceList({
    variables: { search: filter },
  });

  const handleOnFilter = useCallback((values: FormFilter) => {
    const filter: FormFilter = {
      komoditas: values.komoditas ? values.komoditas.toUpperCase() : undefined,
      size: values.size ? values.size : undefined,
      area_kota: values.area_kota ? values.area_kota : undefined,
      area_provinsi: values.area_provinsi ? values.area_provinsi : undefined,
    };

    setFilter(filter);
  }, []);

  const handleOnSegmentChange = useCallback((value) => {
    setSegment(value);
  }, []);

  useEffect(() => {
    emitter.on("@filter/submit", handleOnFilter);
    emitter.on("@price_list/change_layout", handleOnSegmentChange);

    return () => {
      emitter.off("@filter/submit", handleOnFilter);
      emitter.off("@price_list/change_layout", handleOnSegmentChange);
    };
  }, [emitter, handleOnFilter, handleOnSegmentChange]);

  return (
    <Fragment>
      {segment === "list" ? (
        <PriceListTableView data={data} loading={loading} />
      ) : (
        <PriceListCardView data={data} loading={loading} />
      )}
    </Fragment>
  );
};

export default List;
