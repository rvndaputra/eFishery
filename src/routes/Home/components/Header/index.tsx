import type { FC } from "react";

import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Button, Col, Row, Segmented, Space } from "antd";
import type { SegmentedValue } from "antd/es/segmented";

import { useHomeContext } from "../../context/home";

interface HeaderProps {
  onAddListClick: () => void;
  onFilterClick: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { emitter } = useHomeContext();
  const { onAddListClick, onFilterClick } = props;

  const handleOnSegmentChange = (value: SegmentedValue) => {
    emitter.emit("@price_list/change_layout", value as string);
  };

  return (
    <Row className="mb-3" gutter={[16, 16]} justify={"space-between"}>
      <Col>
        <Space wrap>
          Layout:
          <Segmented
            options={[
              {
                value: "list",
                icon: <BarsOutlined />,
              },
              {
                value: "card",
                icon: <AppstoreOutlined />,
              },
            ]}
            onChange={handleOnSegmentChange}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </Space>
      </Col>
      <Col>
        <Space>
          <Button type="default" onClick={onFilterClick}>
            Filter
          </Button>
          <Button type="primary" onClick={onAddListClick}>
            Tambah Daftar
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
