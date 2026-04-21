import styles from "./Pagination.module.css";
const Pagination = ({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: number;

  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handlePageChange = (pageNumber: number = 0) => {
    if (pageNumber === 0) {
      setPage((prev) => prev + 1);
    } else {
      setPage(pageNumber);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <span
            className={`${styles.pageNumber} ${page === pageNumber ? styles.activePage : ""}`}
            key={index}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(0)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
