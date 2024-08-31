import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  maxPagesToShow?: number;
}

const Pagination = ({ currentPage, totalPages, searchQuery, maxPagesToShow = 5 }: PaginationProps) => {
  const limitedTotalPages = Math.min(totalPages, 500);

  const generatePageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(limitedTotalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, limitedTotalPages);
    } else if (currentPage > limitedTotalPages - 3) {
      startPage = Math.max(limitedTotalPages - 4, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className='mt-10 flex items-center justify-center gap-3'>
      {currentPage > 1 && (
        <>
          <Link
            href={{
              pathname: '/searchResults',
              query: { search: searchQuery, page: 1 },
            }}
            className='transition hover:text-slate-300'
          >
            First
          </Link>
          <Link
            href={{
              pathname: '/searchResults',
              query: { search: searchQuery, page: currentPage - 1 },
            }}
            className='transition hover:text-slate-300'
          >
            Previous
          </Link>
        </>
      )}

      {generatePageNumbers().map((pageNumber) => (
        <Link
          key={pageNumber}
          href={{
            pathname: '/searchResults',
            query: { search: searchQuery, page: pageNumber },
          }}
          className={currentPage === pageNumber ? 'text-slate-400' : 'transition hover:text-slate-300'}
        >
          {pageNumber}
        </Link>
      ))}

      {currentPage < limitedTotalPages && (
        <>
          <Link
            href={{
              pathname: '/searchResults',
              query: { search: searchQuery, page: currentPage + 1 },
            }}
            className='transition hover:text-slate-300'
          >
            Next
          </Link>
          <Link
            href={{
              pathname: '/searchResults',
              query: { search: searchQuery, page: limitedTotalPages },
            }}
            className='transition hover:text-slate-300'
          >
            Last
          </Link>
        </>
      )}
    </div>
  );
};

export default Pagination;
