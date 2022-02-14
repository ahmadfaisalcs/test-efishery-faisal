import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { PageContext } from "../context/PageContext";

import JsonReactForm from "json-reactform";

const ModalEdit = () => {
  const {
    handleEditData,
    areaList,
    sizeList,
    loadingAdd,
    showModalEdit,
    handleCloseModalEdit,
    dataEdit,
  } = useContext(PageContext);

  const labelSave = loadingAdd ? "Loading..." : "Save";

  const modelForm = {
    Komoditas: {
      type: "text",
      required: true,
      defaultValue: dataEdit?.komoditas,
    },
    Area: {
      type: "select",
      required: true,
      options: areaList,
      defaultValue: dataEdit?.area_kota,
    },
    Size: {
      type: "select",
      required: true,
      options: sizeList,
      defaultValue: dataEdit?.size,
    },
    Price: {
      type: "number",
      required: true,
      defaultValue: dataEdit?.price,
    },
    [labelSave]: {
      type: "submit",
      disabled: loadingAdd,
    },
  };

  return (
    <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JsonReactForm
          model={modelForm}
          onSubmit={(data) => {
            handleEditData(data);
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalEdit;
