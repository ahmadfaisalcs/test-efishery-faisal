import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import { Button, Table } from "react-bootstrap";

import SortDown from "../assets/icon/sort-down-alt.svg";
import SortUp from "../assets/icon/sort-up.svg";

import EditIcon from "../assets/icon/pencil-square.svg";
import DeleteIcon from "../assets/icon/trash.svg";

const TableList = ({ columns = [] }) => {
  const {
    listData,
    sortType,
    columnSorted,
    handleColumnSorted,
    handleClickEdit,
    handleClickDelete,
  } = useContext(PageContext);

  return (
    <>
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            {columns.map((col, idx) => {
              return (
                <th
                  key={idx}
                  onClick={() =>
                    handleColumnSorted(
                      col.accessor,
                      sortType === "desc" || sortType === "" ? "asc" : "desc"
                    )
                  }
                  className="header-table"
                >
                  {col.label}{" "}
                  {columnSorted === col.accessor ? (
                    <img
                      src={sortType === "asc" ? SortDown : SortUp}
                      className="sort-icon"
                      alt="logo"
                    />
                  ) : (
                    ""
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {listData.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row?.komoditas}</td>
                <td className="align-text-right">{row?.size}</td>
                <td className="align-text-right">
                  {row?.price && parseInt(row?.price)?.toLocaleString("id")}
                </td>
                <td>{row?.area_provinsi}</td>
                <td>{row?.area_kota}</td>
                <td>{row?.date_string}</td>

                <td>
                  <Button
                    className="btn-table"
                    onClick={() => handleClickEdit(row)}
                  >
                    <img src={EditIcon} alt="btn-edit" />
                  </Button>
                  <Button
                    className="btn-table"
                    onClick={() => handleClickDelete(row)}
                  >
                    <img src={DeleteIcon} alt="btn-delete" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableList;
