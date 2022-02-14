import { useState, useEffect } from "react";

const useApiCallSize = () => {
  const [sizeList, setSizeList] = useState([]);
  const [loadingSize, setLoadingSize] = useState(false);

  const SteinStore = require("stein-js-client");
  const storeSize = new SteinStore(
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size"
  );

  const fetchSize = () => {
    setLoadingSize(true);
    storeSize
      .read("")
      .then((data) => {
        const newData = data?.map((item) => {
          return {
            ...item,
            label: item.size,
            value: item.size,
          };
        });
        setSizeList(newData);
        setLoadingSize(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingSize(false);
      });
  };

  const loadData = () => {
    fetchSize();
  };

  useEffect(() => {
    fetchSize();
  }, []);

  return [loadingSize, sizeList, setSizeList, storeSize, loadData];
};

export default useApiCallSize;
