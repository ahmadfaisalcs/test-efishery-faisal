import { useState, useEffect } from "react";

const useApiCallArea = () => {
  const [areaList, setAreaList] = useState([]);
  const [loadingArea, setLoadingArea] = useState(false);

  const SteinStore = require("stein-js-client");
  const storeArea = new SteinStore(
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area"
  );

  const fetchArea = () => {
    setLoadingArea(true);
    storeArea
      .read("")
      .then((data) => {
        const newData = data?.map((item) => {
          return {
            ...item,
            label: `${item.city} - ${item.province}`,
            value: item.city,
          };
        });
        setAreaList(newData);
        setLoadingArea(false);
      })
      .catch((err) => {
        console.error(err?.response?.data);
        setLoadingArea(false);
      });
  };

  const loadData = () => {
    fetchArea();
  };

  useEffect(() => {
    fetchArea();
  }, []);

  return [loadingArea, areaList, setAreaList, storeArea, loadData];
};

export default useApiCallArea;
