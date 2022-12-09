import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { NormalizedFishPriceList } from "../../../../model/fish-price-list";
import type { AllOptionsRepository } from "../../../../model/options";

export const getColumns = (options: AllOptionsRepository) => {
  const { area, size } = options.data;

  const columns: ColumnsType<NormalizedFishPriceList> = [
    {
      title: "#",
      key: "index",
      width: "20px",
      render: (_: string, record, index: number) => (1 - 1) * 10 + index + 1,
    },
    {
      title: "Komoditas",
      dataIndex: "komoditas",
      key: "komoditas",
    },
    {
      title: "Provinsi",
      dataIndex: "area_provinsi",
      key: "area_provinsi",
      filters: area.provinces.map((province) => ({
        text: province,
        value: province,
      })),
      onFilter: (value, record) => record.area_provinsi === value,
    },
    {
      title: "Kota",
      dataIndex: "area_kota",
      key: "area_kota",
      filters: area.cities.map((city) => ({
        text: city,
        value: city,
      })),
      onFilter: (value, record) => record.area_kota === value,
    },

    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price.length - b.price.length,
        multiple: 1,
      },
      render: (value) =>
        new Intl.NumberFormat("id", {
          style: "currency",
          currency: "IDR",
        }).format(value),
    },
    {
      title: "Ukuran",
      dataIndex: "size",
      key: "size",
      filters: size.size.map((sz) => ({
        text: `${sz} cm`,
        value: sz,
      })),
      sorter: {
        compare: (a, b) => a.size.length - b.size.length,
        multiple: 2,
      },
      render: (value) => `${value} cm`,
      onFilter: (value, record) => record.size === value,
    },
    {
      title: "Tanggal",
      dataIndex: "tgl_parsed",
      key: "tgl_parsed",
      render: (value) => dayjs(value).format("DD MMM YYYY"),
    },
  ];

  return columns;
};
