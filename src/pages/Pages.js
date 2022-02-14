import React, { useContext } from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import Filter from "../components/Filter";
import ModalAdd from "../components/ModalAdd";
import { PageContext } from "../context/PageContext";

import ModalAlert from "../components/ModalAlert";
import TableList from "../components/TableList";
import ModalEdit from "../components/ModalEdit";
import ModalConfirm from "../components/ModalConfirm";

const Pages = () => {
  const { setShowFilter, searchInput, handleSearch, setShowModalAdd } =
    useContext(PageContext);

  const columns = React.useMemo(
    () => [
      {
        label: "Komoditas",
        accessor: "komoditas",
      },
      {
        label: "Ukuran",
        accessor: "size",
      },
      {
        label: "Harga",
        accessor: "price",
      },
      {
        label: "Provinsi",
        accessor: "area_provinsi",
      },
      {
        label: "Kota",
        accessor: "area_kota",
      },
      {
        label: "Tanggal",
        accessor: "tgl_parsed",
      },
      {
        label: "Opsi",
        accessor: "opsi",
      },
    ],
    []
  );

  return (
    <>
      <Container>
        <Row className="p-24">
          <Col>
            <h2 className="mt-0">eFishery Test Faisal</h2>

            <h4>Data Harga Perikanan</h4>

            <br />

            <Row>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Cari..."
                  className="search"
                  //
                  value={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Col>

              <Col>
                <Button
                  size="sm"
                  className="mx-2"
                  onClick={() => setShowModalAdd(true)}
                >
                  Tambah
                </Button>

                <Button
                  size="sm"
                  className="mx-2"
                  onClick={() => setShowFilter(true)}
                >
                  Filter
                </Button>
              </Col>
            </Row>

            <br />

            <Card>
              <Card.Body className="table-list">
                <TableList columns={columns} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Filter />

      <ModalAdd />

      <ModalEdit />

      <ModalConfirm />

      <ModalAlert />
    </>
  );
};

export default Pages;
