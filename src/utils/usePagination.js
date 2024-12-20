import { useEffect, useState } from "react";

const usePagination = (initPage, totalPages) => {
  const [curPage, setCurPage] = useState(initPage);

  const handleNextPage = () => {
    if (curPage < totalPages) {
      setCurPage(curPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("page", curPage);
  }, [curPage]);

  return { curPage, handleNextPage, handlePrevPage, setCurPage };
};

export default usePagination;
