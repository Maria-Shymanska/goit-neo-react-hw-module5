import css from "./Pagination.module.css";
import clsx from "clsx";

const Pagination = ({ currentPage, onNextPage, onPrevPage, totalPages }) => {
  const isAtStart = currentPage === 1;
  const isAtEnd = currentPage === totalPages;

  return (
    <div className={css.pagWrap}>
      <button
        className={clsx(css.btn, { [css.disabled]: isAtStart })}
        onClick={onPrevPage}
        disabled={isAtStart}
      >
        Previous
      </button>
      <button
        className={clsx(css.btn, { [css.disabled]: isAtEnd })}
        onClick={onNextPage}
        disabled={isAtEnd}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
