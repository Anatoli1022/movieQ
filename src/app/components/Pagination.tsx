import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  maxPagesToShow?: number;
}

const Pagination = ({ currentPage, totalPages, searchQuery, maxPagesToShow = 5 }: PaginationProps) => {
    return <div></div>
}
export default Pagination;
