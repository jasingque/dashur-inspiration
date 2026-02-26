import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  count: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ count, currentPage, onPageChange }: PaginationProps) => {
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(count, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-600 bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              currentPage === 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-600 bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}
      
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-600 bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          {page}
        </button>
      ))}
      
      {endPage < count && (
        <>
          {endPage < count - 1 && <span className="text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(count)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              currentPage === count
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-600 bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {count}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === count}
        className="p-2 rounded-lg border border-gray-600 bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
