import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { PageContext } from "../context/PageContext";

import JsonReactForm from "json-reactform";

const ModalAdd = () => {
  const {
    handleAddData,
    areaList,
    sizeList,
    loadingAdd,
    showModalAdd,
    handleCloseModalAdd,
  } = useContext(PageContext);

  const labelSave = loadingAdd ? "Loading..." : "Save";

  const modelForm = {
    Komoditas: {
      type: "text",
      required: true,
    },
    Area: {
      type: "select",
      required: true,
      options: areaList,
    },
    Size: {
      type: "select",
      required: true,
      options: sizeList,
    },
    Price: {
      type: "number",
      required: true,
    },
    [labelSave]: {
      type: "submit",
      disabled: loadingAdd,
    },
  };

  return (
    <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JsonReactForm
          model={modelForm}
          onSubmit={(data) => {
            handleAddData(data);
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
