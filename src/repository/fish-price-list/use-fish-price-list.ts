import { useMemo, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import qs from "query-string";

import { EFISHERY_API } from "../../model";
import type {
  FishPriceListQueryResponse,
  FishPriceListQueryVariables,
} from "../../model/fish-price-list";

import normalize from "./normalizer";

interface Dependencies {
  variables?: FishPriceListQueryVariables;
}

const useFishPriceList = (deps?: Dependencies) => {
  const { variables } = deps ?? {};
  /**
   * it's not possible to use `limit` and `offset` for table pagination cause we can't get the total amount of data (API limitation)
   * however, it's still possible to implement pagination with infinite scroll instead
   */
  const { limit, offset, search } = variables ?? {};

  const _offset = useRef(offset);
  let _search;

  try {
    _search = JSON.stringify(search);
  } catch (err) {
    console.log("err", err);
  }

  const _variables: FishPriceListQueryVariables = {
    limit: limit,
    offset: _offset.current,
    search: _search as FishPriceListQueryVariables["search"],
  };

  const query = qs.stringify(_variables);

  const url = `${EFISHERY_API.queries.list}?${query}`;

  const { data, error, isLoading } = useQuery<FishPriceListQueryResponse[]>({
    queryKey: ["fish_price_list", query],
    queryFn: async ({ signal }) => {
      const res = await fetch(url, { signal });

      if (!res.ok) {
        throw new Error("Network response was not oke");
      }

      return await res.json();
    },
  });

  return useMemo(() => {
    const normalized = normalize(data);

    return {
      data: normalized,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useFishPriceList;
