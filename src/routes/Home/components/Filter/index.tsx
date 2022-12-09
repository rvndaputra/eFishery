import type { FC } from "react";
import { Button, Form, Input, Select, Space } from "antd";

import { useHomeContext } from "../../context/home";
import type { FormFilter } from "../../model/filter";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

interface FilterProps {
  onCloseFilter: () => void;
}

const Filter: FC<FilterProps> = (props) => {
  const { onCloseFilter } = props;
  const { emitter, options } = useHomeContext();
  const [form] = Form.useForm<FormFilter>();

  const { data, loading } = options;
  const { area, size } = data;

  const onFinish = (values: FormFilter) => {
    emitter.emit("@filter/submit", values);
    onCloseFilter();
  };

  const onProvinceChange = () => {
    form.setFieldValue("area_kota", undefined);
  };

  const onReset = () => {
    form.resetFields();
    onCloseFilter();
    emitter.emit("@filter/submit", form.getFieldsValue());
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Form.Item name="komoditas" label="Komoditas">
        <Input />
      </Form.Item>
      <Form.Item name="size" label="Ukuran">
        <Select
          allowClear
          loading={loading}
          placeholder="Pilih ukuran"
          onChange={onProvinceChange}
        >
          <Option value={undefined}>LIHAT SEMUA</Option>
          {size.size.map((sz) => {
            return <Option value={sz}>{`${sz} cm`}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item name="area_provinsi" label="Provinsi">
        <Select
          allowClear
          loading={loading}
          placeholder="Pilih provinsi"
          onChange={onProvinceChange}
        >
          <Option value={undefined}>LIHAT SEMUA</Option>
          {area.provinces.map((province) => {
            return <Option value={province}>{province}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.area_provinsi !== currentValues.area_provinsi
        }
      >
        {({ getFieldValue }) => {
          const province = getFieldValue("area_provinsi");
          const cities = (area.area[province] as []) || [];

          return province ? (
            <Form.Item name="area_kota" label="Kota">
              <Select allowClear loading={loading} placeholder="Pilih kota">
                <Option value={undefined}>LIHAT SEMUA</Option>
                {cities.map((city) => {
                  return <Option value={city}>{city}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Filter
          </Button>
          <Button type="ghost" htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Filter;
