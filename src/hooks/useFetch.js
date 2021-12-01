import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, page, genreforURL) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const getItems = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setContent(data.results);
    setNumOfPages(data.total_pages);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    window.scroll(0, 0);
    getItems();
  }, [url, page, genreforURL, getItems]);
  return { loading, content, numOfPages };
};
