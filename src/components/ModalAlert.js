import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { PageContext } from "../context/PageContext";

const ModalAlert = () => {
  const {
    showModalAlert,
    headerModalAlert,
    contentModalAlert,
    handleCloseAlert,
  } = useContext(PageContext);

  return (
    <Modal show={showModalAlert} onHide={handleCloseAlert}>
      <Modal.Header closeButton>
        <Modal.Title>{headerModalAlert}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{contentModalAlert}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAlert}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlert;
