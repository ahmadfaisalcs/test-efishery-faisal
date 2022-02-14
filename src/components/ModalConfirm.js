import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { PageContext } from "../context/PageContext";

const ModalConfirm = () => {
  const { showModalConfirm, handleCloseModalConfirm, handleDeleteData } =
    useContext(PageContext);

  return (
    <Modal show={showModalConfirm} onHide={handleCloseModalConfirm}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>Anda akan menghapus data </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalConfirm}>
          Tutup
        </Button>
        <Button variant="danger" onClick={handleDeleteData}>
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
