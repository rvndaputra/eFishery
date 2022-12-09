import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { EFISHERY_API } from "../../model";
import type {
  AllOptionsRepository,
  OptionAreaQueryResponse,
  OptionSizeQueryResponse,
} from "../../model/options";
import { normalizeOptArea, normalizeOptSize } from "./normalizer";

const useAllOptions = (): AllOptionsRepository => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<[OptionAreaQueryResponse[], OptionSizeQueryResponse[]]>({
    queryKey: ["all_options"],
    queryFn: async ({ signal }) => {
      const respArea = await fetch(EFISHERY_API.queries.options.area, {
        signal,
      });
      const respSize = await fetch(EFISHERY_API.queries.options.size, {
        signal,
      });

      const area = await respArea.json();
      const size = await respSize.json();

      if (!respArea.ok || !respSize.ok) {
        throw new Error("Network response was not oke");
      }

      return Promise.all([area, size]);
    },
  });

  return useMemo(() => {
    const normalizedOptArea = normalizeOptArea(data[0]);
    const normalizedOptSize = normalizeOptSize(data[1]);

    return {
      data: {
        area: normalizedOptArea,
        size: normalizedOptSize,
      },
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useAllOptions;
