import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "../Button/Button";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Pagination = ({
  currentPage,
  setPage,
  hasPrev,
  hasNext,
}: PaginationProps) => {
  const handlePrev = () => {
    if (hasPrev) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <Button onClick={handlePrev} disabled={!hasPrev}>
        <FaChevronLeft size={14} />
      </Button>

      <span className="current-page">{currentPage}</span>

      <Button onClick={handleNext} disabled={!hasNext}>
        <FaChevronRight size={14} />
      </Button>
    </div>
  );
};
