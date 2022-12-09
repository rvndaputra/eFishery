import type { FC } from "react";

import { Table } from "antd";

import type { NormalizedFishPriceList } from "../../../../../model/fish-price-list";
import { useHomeContext } from "../../../context/home";
import { getColumns } from "../columns";

interface PriceListTableViewProps {
  data: NormalizedFishPriceList[];
  loading: boolean;
}

const PriceListTableView: FC<PriceListTableViewProps> = (props) => {
  const { data, loading } = props;
  const { options } = useHomeContext();

  const columns = getColumns(options);

  /**
   * TODO: need to virtualize table to achieve a high performance table
   */

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: "max-content" }}
      size="small"
      pagination={false}
    />
  );
};

export default PriceListTableView;
