import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { EFISHERY_API } from "../../model";
import type { OptionAreaQueryResponse } from "../../model/options";
import { normalizeOptArea } from "./normalizer";

const useOptionArea = () => {
  const { data, error, isLoading } = useQuery<OptionAreaQueryResponse[]>({
    queryKey: ["option_area"],
    queryFn: async ({ signal }) => {
      const res = await fetch(EFISHERY_API.options.area, { signal });

      if (!res.ok) {
        throw new Error("Network response was not oke");
      }

      return await res.json();
    },
  });

  return useMemo(() => {
    const normalize = normalizeOptArea(data);

    return {
      data: normalize,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useOptionArea;
