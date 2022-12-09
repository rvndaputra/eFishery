import { message, Skeleton } from "antd";
import { Fragment } from "react";

import Form from "../../../../presentations/Form";
import { useHomeContext } from "../../context/home";

import useFormEvent from "./usecase/use-form-event";

const AddList = () => {
  const { options } = useHomeContext();
  const { data, loading } = options;

  const [messageApi, contextHolder] = message.useMessage();

  const [handleOnSubmit, { loading: addLoading }] = useFormEvent({
    messageApi: messageApi,
  });

  const AddListForm = {
    Komoditas: {
      type: "text",
      required: true,
    },
    Harga: {
      type: "number",
      required: true,
    },
    Ukuran: {
      type: "select",
      placeholder: "Pilih ukuran",
      required: true,
      options: data.size.size.map((size) => ({
        label: `${size} cm`,
        value: size,
      })),
    },
    Provinsi: {
      type: "select",
      placeholder: "Pilih provinsi",
      required: true,
      options: data.area.provinces.map((province) => ({
        label: province,
        value: province,
      })),
    },
    Kota: {
      type: "select",
      placeholder: "Pilih kota",
      required: true,
      options: data.area.cities.map((city) => ({
        label: city,
        value: city,
      })),
    },
    Simpan: {
      type: "submit",
      disabled: addLoading,
    },
  };

  if (loading) return <Skeleton />;

  return (
    <Fragment>
      {contextHolder}
      <Form model={AddListForm} onSubmit={handleOnSubmit} />
    </Fragment>
  );
};

export default AddList;
