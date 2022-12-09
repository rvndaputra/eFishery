import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { EFISHERY_API } from "../../model";
import { OptionSizeQueryResponse } from "../../model/options";
import { normalizeOptSize } from "./normalizer";

const useOptionSize = () => {
  const { data, error, isLoading } = useQuery<OptionSizeQueryResponse[]>({
    queryKey: ["option_size"],
    queryFn: async ({ signal }) => {
      const res = await fetch(EFISHERY_API.queries.options.size, { signal });

      if (!res.ok) {
        throw new Error("Network response was not oke");
      }

      return await res.json();
    },
  });

  return useMemo(() => {
    const normalize = normalizeOptSize(data);

    return {
      data: normalize,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useOptionSize;
