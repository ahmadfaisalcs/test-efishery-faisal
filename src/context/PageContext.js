import React, { useState } from "react";
import { node } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import useApiCallList from "./useApiCallList";
import useApiCallArea from "./useApiCallArea";
import useApiCallSize from "./useApiCallSize";

export const PageContext = React.createContext();

const PageProvider = ({ children }) => {
  const [
    loadingListData,
    rawData,
    listData,
    setFilteredData,
    storeList,
    fetchListData,
  ] = useApiCallList();

  const [loadingSize, sizeList] = useApiCallSize();

  const [loadingArea, areaList] = useApiCallArea();

  const [showFilter, setShowFilter] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const [columnSorted, setColumnSorted] = useState("");
  const [sortType, setSortType] = useState("");

  const [showModalAlert, setShowModalAlert] = useState(false);
  const [headerModalAlert, setHeaderModalAlert] = useState("");
  const [contentModalAlert, setContentModalAlert] = useState("");

  const [loadingAdd, setLoadingAdd] = useState(false);

  const [filterObject, setFilterObject] = useState({});

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [dataEdit, setDataEdit] = useState({});

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const handleAddData = (data = {}) => {
    setLoadingAdd(true);

    const newData = {
      uuid: uuidv4(),
      komoditas: data.Komoditas,
      area_provinsi: data.Area.value,
      area_kota: data.Area.city,
      size: data.Size.value,
      price: data.Price,
      tgl_parsed: new Date(),
      timestamp: Date.now(),
    };
    storeList
      .append("", [newData])
      .then((res) => {
        setShowModalAdd(false);
        fetchListData();
        handleShowAlert("Berhasil", "Berhasil menambah data");
        setLoadingAdd(false);
      })
      .catch((err) => {
        handleShowAlert("Gagal", "Gagal menambah data");
        setLoadingAdd(false);
      });
  };

  const handleEditData = (data = {}) => {
    setLoadingAdd(true);

    const newData = {
      uuid: data.uuid,
      komoditas: data.Komoditas,
      area_provinsi: data.Area.value,
      area_kota: data.Area.city,
      size: data.Size.value,
      price: data.Price,
      tgl_parsed: new Date(),
      timestamp: Date.now(),
    };

    storeList
      .edit("", {
        search: {
          komoditas: dataEdit.komoditas,
          area_kota: dataEdit.area_kota,
          size: dataEdit.size,
        },
        condition: {
          komoditas: dataEdit.komoditas,
          area_kota: dataEdit.area_kota,
          size: dataEdit.size,
        },
        set: newData,
      })
      .then((res) => {
        setShowModalEdit(false);
        fetchListData();
        handleShowAlert("Berhasil", "Berhasil mengubah data");
        setLoadingAdd(false);
      })
      .catch((err) => {
        handleShowAlert("Gagal", "Gagal mengubah data");
        setLoadingAdd(false);
      });
  };

  const handleDeleteData = () => {
    setLoadingAdd(true);
    storeList
      .delete("", {
        // search: {
        //   komoditas: dataEdit.komoditas,
        //   area_kota: dataEdit.area_kota,
        //   size: dataEdit.size,
        // },
        search: {
          uuid: dataEdit.uuid,
        },
        condition: {
          komoditas: dataEdit.komoditas,
          area_kota: dataEdit.area_kota,
          size: dataEdit.size,
        },
      })
      .then((res) => {
        setShowModalConfirm(false);
        fetchListData();
        handleShowAlert("Berhasil", "Berhasil menghapus data");
        setLoadingAdd(false);
      })
      .catch((err) => {
        handleShowAlert("Gagal", "Gagal menghapus data");
        setLoadingAdd(false);
      });
  };

  const handleSearch = (key) => {
    // setIsLoading(true);
    const allData = [...rawData];

    console.log(key, "key");

    const filteredData = allData.filter(
      (item) =>
        (item.komoditas &&
          item.komoditas?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1) ||
        (item.area_kota &&
          item.area_kota?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1) ||
        (item.area_provinsi &&
          item.area_provinsi?.toLowerCase()?.indexOf(key?.toLowerCase()) !==
            -1) ||
        (item.date_string &&
          item.date_string?.toLowerCase()?.indexOf(key?.toLowerCase()) !==
            -1) ||
        (item.price &&
          item.price?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1) ||
        (item.size &&
          item.size?.toLowerCase()?.indexOf(key?.toLowerCase()) !== -1)
    );

    console.log(filteredData);

    setFilteredData(filteredData);

    setSearchInput(key);
  };

  const handleShowAlert = (header, content) => {
    setShowModalAlert(true);
    setHeaderModalAlert(header);
    setContentModalAlert(content);
  };

  const handleCloseAlert = () => {
    setShowModalAlert(false);
    setHeaderModalAlert("");
    setContentModalAlert("");
  };

  const handleFilter = (filterObj = {}) => {
    // console.log(filterObj);

    const allData = [...rawData];
    let filteredData = allData;

    if (filterObj.Komoditas !== "") {
      filteredData = filteredData.filter((item) =>
        item.komoditas
          ?.toLowerCase()
          .includes(filterObj?.Komoditas.toLowerCase())
      );
    }
    if (filterObj.Area?.value) {
      filteredData = filteredData.filter(
        (item) => item.area_provinsi === filterObj.Area?.value
      );
    }
    if (filterObj.Ukuran.value) {
      filteredData = filteredData.filter(
        (item) => item.size === filterObj.Ukuran.value
      );
    }
    if (filterObj["Harga Min."] !== "" && filterObj["Harga Max."] !== "") {
      filteredData = filteredData.filter(
        (item) =>
          parseInt(item.price, 10) >= parseInt(filterObj["Harga Min."], 10) &&
          item.price <= parseInt(filterObj["Harga Max."], 10)
      );
    }
    if (filterObj["Harga Min."] !== "") {
      filteredData = filteredData.filter(
        (item) =>
          parseInt(item.price, 10) >= parseInt(filterObj["Harga Min."], 10)
      );
    }
    if (filterObj["Harga Max."] !== "") {
      filteredData = filteredData.filter(
        (item) =>
          parseInt(item.price, 10) <= parseInt(filterObj["Harga Max."], 10)
      );
    }

    // console.log(filteredData);
    setFilterObject(filterObj);

    setFilteredData(filteredData);
    setShowFilter(false);
  };

  const handleColumnSorted = (key, sortType) => {
    let sortedData = [...rawData];

    if (key === "size" || key === "price") {
      sortedData =
        sortType === "asc"
          ? sortedData.sort((a, b) =>
              // b[key]?.localeCompare(a[key], undefined),
              // { numeric: true, sensitivity: "base" }
              parseInt(parseInt(b[key]) - parseInt(a[key]))
            )
          : sortedData.sort((a, b) =>
              // -b[key]?.localeCompare(a[key], undefined),
              // { numeric: true, sensitivity: "base" }
              parseInt(parseInt(-b[key]) - parseInt(a[key]))
            );
    } else if (key === "tgl_parsed") {
      sortedData =
        sortType === "asc"
          ? sortedData.sort((a, b) =>
              new Date(b[key]) < new Date(a[key]) ? -1 : 1
            )
          : sortedData.sort((a, b) =>
              new Date(b[key]) < new Date(a[key]) ? 1 : -1
            );
    } else {
      sortedData =
        sortType === "asc"
          ? sortedData.sort((a, b) => -b[key]?.localeCompare(a[key]))
          : sortedData.sort((a, b) => b[key]?.localeCompare(a[key]));
    }

    setFilteredData(sortedData);

    setColumnSorted(key);

    setSortType(sortType);
  };

  const handleClickEdit = (data = {}) => {
    setDataEdit(data);
    setShowModalEdit(true);
  };

  const handleClickDelete = (data = {}) => {
    setDataEdit(data);
    setShowModalConfirm(true);
  };

  const handleCloseModalAdd = () => {
    setShowModalAdd(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleCloseModalConfirm = () => {
    setShowModalConfirm(false);
  };

  const dataProps = {
    listData,
    loadingListData,
    //
    areaList,
    loadingArea,
    //
    sizeList,
    loadingSize,
    //
    sortType,
    columnSorted,
    //
    showFilter,
    setShowFilter,
    //
    searchInput,
    setSearchInput,
    //
    filterObject,
    //
    showModalAlert,
    headerModalAlert,
    contentModalAlert,
    //
    loadingAdd,
    //
    showModalAdd,
    setShowModalAdd,
    //
    showModalEdit,
    setShowModalEdit,
    dataEdit,
    //
    showModalConfirm,
    //
    fetchListData,
    //
    //
    handleAddData,
    handleSearch,
    handleShowAlert,
    handleFilter,
    handleColumnSorted,
    handleCloseAlert,
    handleClickEdit,
    handleEditData,
    handleClickDelete,
    handleDeleteData,
    //
    handleCloseModalAdd,
    handleCloseModalEdit,
    handleCloseModalConfirm,
  };

  return (
    <PageContext.Provider value={dataProps}>{children}</PageContext.Provider>
  );
};

PageProvider.propTypes = {
  children: node.isRequired,
};

export default PageProvider;
