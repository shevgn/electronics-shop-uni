import { useState, useEffect } from "react";

export default function CatalogPagination({
  itemsCount = 1,
  maxItemsPerPage = 24,
}: {
  itemsCount: number;
  maxItemsPerPage: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisiblePages, setMaxVisiblePages] = useState(6);

  const totalPages: number = Math.ceil(itemsCount / maxItemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const range = (start: number, end: number): Array<number> => {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  };

  const getPaginationRange = () => {
    const edges: number = 2;
    if (totalPages <= maxVisiblePages) return range(1, totalPages);
    if (currentPage > edges + 1) {
      if (currentPage + maxVisiblePages / 2 + 1 < totalPages)
        return [
          1,
          0,
          ...range(currentPage - 1, currentPage + maxVisiblePages / 2 + 1),
          0,
        ];

      return [
        1,
        0,
        ...range(
          totalPages - maxVisiblePages + maxVisiblePages / 2 - 2,
          totalPages,
        ),
      ];
    }
    return [...range(1, maxVisiblePages), 0];
  };

  const updateVisiblePages = () => {
    if (window.innerWidth < 640) {
      setMaxVisiblePages(4);
    } else if (window.innerWidth < 1024) {
      setMaxVisiblePages(8);
    } else {
      setMaxVisiblePages(10);
    }
  };

  useEffect(() => {
    updateVisiblePages();

    window.addEventListener("resize", updateVisiblePages);
    return () => window.removeEventListener("resize", updateVisiblePages);
  }, []);

  return (
    <div className="flex justify-between">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`group flex flex-row items-center md:space-x-2 ${currentPage === 1 && "invisible"}`}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            className="group-hover:fill-gray-600"
            d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z"
            fill="#000000"
          ></path>
        </svg>
        {window.innerWidth < 640 ? (
          <span className="visually-hidden">Previous</span>
        ) : (
          <p className="text-black group-hover:text-gray-600 sm:text-xs md:text-base">
            Previous
          </p>
        )}
      </button>
      <ul className="flex space-x-2">
        {getPaginationRange().map((page, index) =>
          page !== 0 ? (
            <li key={index}>
              <button
                onClick={() => handlePageChange(page)}
                className={`h-6 w-6 rounded-lg border text-sm text-black transition-all hover:scale-105 hover:border-gray-300 sm:h-7 sm:w-7 md:h-8 md:w-8 md:text-base ${currentPage === page ? "bg-gray-200" : ""}`}
              >
                <p>{page}</p>
              </button>
            </li>
          ) : (
            <li key={index}>
              <button
                disabled={true}
                className="h-6 w-6 rounded-lg border text-sm text-black transition-all hover:border-gray-300 sm:h-7 sm:w-7 md:h-8 md:w-8 md:text-base"
              >
                <p>...</p>
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`group flex flex-row items-center md:space-x-2 ${currentPage === totalPages && "invisible"}`}
      >
        {window.innerWidth < 640 ? (
          <span className="visually-hidden">Next</span>
        ) : (
          <p className="text-black group-hover:text-gray-600 sm:text-xs md:text-base">
            Next
          </p>
        )}
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            className="group-hover:fill-gray-600"
            d="M8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071Z"
            fill="#000000"
          ></path>
        </svg>
      </button>
    </div>
  );
}
