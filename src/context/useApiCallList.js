import { useState, useEffect } from "react";

const useApiCallList = () => {
  const [listData, setListData] = useState([]);
  const [loadingListData, setLoadingListData] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const SteinStore = require("stein-js-client");
  const storeList = new SteinStore(
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list"
  );

  const fetchListData = () => {
    setLoadingListData(true);
    storeList
      .read("")
      .then((data) => {
        let newData = data?.reduce((acc, curr) => {
          if (curr.uuid) {
            const newItem = {
              ...curr,
              date_string: new Date(curr.tgl_parsed).toDateString(),
            };
            acc.push(newItem);
          }

          return acc;
        }, []);

        newData = newData.sort(
          (a, b) => new Date(b.tgl_parsed) - new Date(a.tgl_parsed)
        );

        setListData(newData);
        setFilteredData(newData);

        setLoadingListData(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingListData(false);
      });
  };

  const loadData = () => {
    fetchListData();
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return [
    loadingListData,
    listData,
    filteredData,
    setFilteredData,
    storeList,
    loadData,
  ];
};

export default useApiCallList;
