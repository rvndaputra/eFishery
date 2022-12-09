import type { FC } from "react";
import { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Drawer, FloatButton, Modal } from "antd";
import Title from "antd/es/typography/Title";

import AddList from "./components/AddList/Loadable";
import Filter from "./components/Filter/Loadable";

import Header from "./components/Header";
import List from "./components/List";

import HomeProvider from "./context/home";
import useEmitter from "./hooks/use-emitter";

const Home: FC = () => {
  const emitter = useEmitter();

  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleOpenAddList = () => {
    setOpenModal(true);
  };

  return (
    <HomeProvider emitter={emitter}>
      <div className="m-5">
        <Title>Daftar Harga Ikan</Title>
        <Header
          onAddListClick={handleOpenAddList}
          onFilterClick={handleOpenFilter}
        />
        <List />
        <FloatButton
          type="primary"
          tooltip={<div>Tambah Daftar</div>}
          onClick={handleOpenAddList}
          icon={<PlusOutlined />}
        />
        <Drawer
          title="Filter"
          placement="right"
          onClose={() => setOpenFilter(false)}
          open={openFilter}
        >
          <Filter />
        </Drawer>
        <Modal
          open={openModal}
          title="Tambah Daftar"
          footer={false}
          onCancel={() => setOpenModal(false)}
        >
          <AddList />
        </Modal>
      </div>
    </HomeProvider>
  );
};

export default Home;
