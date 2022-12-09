import type { FC } from "react";
import { Fragment, useState } from "react";

import { Collapse, Table } from "antd";

import type { NormalizedFishPriceList } from "../../../../../model/fish-price-list";
import Form from "../../../../../presentations/Form";

import { useHomeContext } from "../../../context/home";

import { getColumns } from "../columns";

const { Panel } = Collapse;

interface PriceListCardViewProps {
  data: NormalizedFishPriceList[];
  loading: boolean;
}

const PriceListCardView: FC<PriceListCardViewProps> = (props) => {
  const { data, loading } = props;
  const { options } = useHomeContext();
  const [groupBy, setGroupBy] = useState<
    keyof NormalizedFishPriceList | undefined
  >(undefined);
  const [subGroupBy, setSubGroupBy] = useState<
    keyof NormalizedFishPriceList | undefined
  >();

  const result = data.reduce((acc, curr) => {
    if (groupBy) {
      if (subGroupBy) {
        acc[curr[groupBy] as any] = acc[curr[groupBy] as any] || {};
        acc[curr[groupBy] as any][curr[subGroupBy] as any] =
          acc[curr[groupBy] as any][curr[subGroupBy] as any] || [];
        acc[curr[groupBy] as any][curr[subGroupBy] as any].push(curr);
      } else {
        acc[curr[groupBy] as any] = acc[curr[groupBy] as any] || [];
        acc[curr[groupBy] as any].push(curr);
      }
    }

    return acc;
  }, Object.create(null));

  const columns = getColumns(options).filter(
    (x) => x.key !== groupBy && x.key !== subGroupBy
  );

  const groupOptions = [
    {
      value: "komoditas",
      label: "Komoditas",
    },
    {
      value: "area_provinsi",
      label: "Provinsi",
    },
    {
      value: "area_kota",
      label: "Kota",
    },
    {
      value: "size",
      label: "Ukuran",
    },
  ];

  const model = {
    Group: {
      type: "select",
      options: groupOptions,
    },
    "Sub Group": {
      type: "select",
      options: groupOptions,
    },
    Simpan: {
      type: "submit",
    },
  };

  const handleOnSubmit = (values: any) => {
    setGroupBy(values["Group"].value);
    setSubGroupBy(values["Sub Group"].value);
  };

  /**
   * TODO: need to virtualize table to achieve a high performance table
   */

  return (
    <Fragment>
      <Form model={model} onSubmit={handleOnSubmit} />
      {Object.keys(result).length > 0 && (
        <Collapse defaultActiveKey={["1"]}>
          {Object.entries(result).map(([key, value]) => {
            return (
              <Panel header={key} key={key}>
                {Array.isArray(value) ? (
                  <Table
                    columns={columns}
                    dataSource={value as []}
                    loading={loading}
                    scroll={{ x: "max-content" }}
                    size="small"
                    pagination={false}
                  />
                ) : (
                  <Collapse defaultActiveKey={["1"]}>
                    {Object.entries(value as any).map(([k, v]) => {
                      return (
                        <Panel header={k} key={k}>
                          <Table
                            columns={columns}
                            dataSource={v as []}
                            loading={loading}
                            scroll={{ x: "max-content" }}
                            size="small"
                            pagination={false}
                          />
                        </Panel>
                      );
                    })}
                  </Collapse>
                )}
              </Panel>
            );
          })}
        </Collapse>
      )}
    </Fragment>
  );
};

export default PriceListCardView;
