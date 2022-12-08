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
  const { limit = 10, offset = 0 } = variables ?? {};

  const _offset = useRef(offset);

  const _variables: FishPriceListQueryVariables = {
    limit: limit,
    offset: _offset.current,
  };

  const query = qs.stringify(_variables);

  const url = `${EFISHERY_API.list}?${query}`;

  const { data, error, isLoading } = useQuery<FishPriceListQueryResponse[]>({
    queryKey: ["fish_price_list"],
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
