export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">{page} / {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
