import React, { useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { PageContext } from "../context/PageContext";

import JsonReactForm from "json-reactform";

const Filter = () => {
  const {
    showFilter,
    setShowFilter,
    areaList,
    sizeList,
    handleFilter,
    filterObject,
  } = useContext(PageContext);

  const hargaMin = "Harga Min.";
  const hargaMax = "Harga Max.";

  const filterModel = {
    Komoditas: {
      type: "text",
      defaultValue: filterObject?.Komoditas,
    },
    Area: {
      type: "select",
      options: areaList,
      defaultValue: filterObject?.Area?.value,
    },
    Ukuran: {
      type: "select",
      options: sizeList,
      defaultValue: filterObject?.Ukuran?.value,
    },
    [hargaMin]: {
      type: "number",
      defaultValue: filterObject?.[hargaMin],
    },
    [hargaMax]: {
      type: "number",
      defaultValue: filterObject?.[hargaMax],
    },
    Filter: {
      type: "submit",
    },
  };

  return (
    <>
      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <JsonReactForm
            model={filterModel}
            onSubmit={(data) => handleFilter(data)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filter;
