import { Modal } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { EFISHERY_API } from "../../../../../model";
import type { AddFishPriceListMutation } from "../../../../../model/fish-price-list";

interface Dependencies {
  messageApi: MessageInstance;
}

const useFormEvent = (
  deps: Dependencies
): [(values: any) => void, { loading: boolean }] => {
  const { messageApi } = deps;
  const [loading, setLoading] = useState(false);

  const _onAddListMutation = async (payload: AddFishPriceListMutation) => {
    messageApi.open({
      type: "loading",
      content: "Action in progress..",
    });

    setLoading(true);

    const res = await fetch(EFISHERY_API.mutations.add_list, {
      method: "POST",
      body: JSON.stringify([payload]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const message = await res.json();

    messageApi.destroy();
    setLoading(false);

    if (!res.ok) {
      Modal.error({
        title: "Error!",
        content: message.error,
      });
    } else {
      Modal.success({
        title: "Success!",
        content: "Success to add new row to sheet",
      });
    }
  };

  const _onSubmit = (values: any) => {
    /**
     * normalize form data to payload
     */
    const data: AddFishPriceListMutation = {
      komoditas: (values["Komoditas"] || "").toUpperCase(),
      price: values["Harga"],
      size: values["Ukuran"] ? values["Ukuran"].value : undefined,
      area_provinsi: values["Provinsi"] ? values["Provinsi"].value : undefined,
      area_kota: values["Kota"] ? values["Kota"].value : undefined,
      uuid: uuidv4(),
      tgl_parsed: new Date(),
    };

    _onAddListMutation(data);
  };

  return [_onSubmit, { loading: loading }];
};

export default useFormEvent;
