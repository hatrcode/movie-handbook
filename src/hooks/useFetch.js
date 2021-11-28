import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    const response = await fetch(url);
    const items = await response.json();
    setItems(items);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getItems();
  }, [url, getItems]);
  return { loading, items };
};
