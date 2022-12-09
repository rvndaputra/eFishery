import { Tag } from "antd";
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
      align: "right",
      width: "20px",
      fixed: "left",
      render: (_: string, record, index: number) => (1 - 1) * 10 + index + 1,
    },
    {
      title: "Komoditas",
      dataIndex: "komoditas",
      key: "komoditas",
      fixed: "left",
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
      title: "Harga (Rp)",
      dataIndex: "price",
      key: "price",
      align: "right",
      sorter: {
        compare: (a, b) => parseInt(a.price) - parseInt(b.price),
        multiple: 1,
      },
      render: (value) =>
        new Intl.NumberFormat("id", {
          currency: "IDR",
        }).format(value),
    },
    {
      title: "Ukuran",
      dataIndex: "size",
      key: "size",
      align: "right",
      filters: size.size.map((sz) => ({
        text: `${sz} cm`,
        value: sz,
      })),
      sorter: {
        compare: (a, b) => parseInt(a.size) - parseInt(b.size),
        multiple: 2,
      },
      render: (value) => {
        if (value <= 70) {
          return <Tag color="red">{`${value} cm`}</Tag>;
        } else if (value >= 80 && value <= 120) {
          return <Tag color="orange">{`${value} cm`}</Tag>;
        } else if (value >= 130) {
          return <Tag color="green">{`${value} cm`}</Tag>;
        }

        return `${value} cm`;
      },
      onFilter: (value, record) => record.size === value,
    },
    {
      title: "Terakhir Diubah",
      dataIndex: "tgl_parsed",
      key: "tgl_parsed",
      align: "center",
      sorter: {
        compare: (a, b) =>
          dayjs(a.tgl_parsed as string).unix() -
          dayjs(b.tgl_parsed as string).unix(),
        multiple: 1,
      },
      render: (value) => dayjs(value).format("DD MMM YYYY"),
    },
  ];

  return columns;
};
