import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { useTransactions } from "../hooks/useTransactions";
import { BsExclamationCircle } from "react-icons/bs";

export default function Dashboard() {
  const { transactions } = useTransactions();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState("CustomerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

   useEffect(() => {
    setPage(1);
  }, [search, filters]);

  // 🔍 SEARCH
  const filteredSearch = transactions.filter((t) =>
    `${t.CustomerName} ${t.PhoneNumber}`.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 FILTERS
  const filtered = filteredSearch.filter((t) => {
  if (filters.Gender && t.Gender !== filters.Gender) return false;
  if (filters.CustomerRegion && t.CustomerRegion !== filters.CustomerRegion) return false;
  if (filters.ProductCategory && t.ProductCategory !== filters.ProductCategory) return false;

if (filters.Tags && filters.Tags.length > 0) {
  // Ensure itemTags is always an array
  const itemTags = Array.isArray(t.Tags)
    ? t.Tags.map(tag => tag.trim().toLowerCase())
    : t.Tags
        ? t.Tags.split(',').map(tag => tag.trim().toLowerCase())
        : [];

  const selectedTags = filters.Tags.map(tag => tag.toLowerCase());

  // AND logic: all selectedTags must exist in itemTags
  if (!selectedTags.every(tag => itemTags.includes(tag))) return false;
}



  if (filters.PaymentMethod && t.PaymentMethod !== filters.PaymentMethod) return false;

  if (filters.AgeMin !== undefined && filters.AgeMin !== "" && t.Age < Number(filters.AgeMin)) return false;
  if (filters.AgeMax !== undefined && filters.AgeMax !== "" && t.Age > Number(filters.AgeMax)) return false;

  if (filters.DateFrom && new Date(t.Date) < new Date(filters.DateFrom)) return false;
  if (filters.DateTo && new Date(t.Date) > new Date(filters.DateTo)) return false;

  return true;
});

  
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "Date") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  // 📄 PAGINATION
const totalPages = Math.ceil(sorted.length / pageSize);
const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

// In Pagination component, enable next only if page < totalPages

  // 🔢 TOTALS
  const totalUnits = filtered.reduce((sum, t) => sum + t.Quantity, 0);
  const totalAmount = filtered.reduce((sum, t) => sum + t.TotalAmount, 0);
  const totalDiscount = filtered.reduce((sum, t) => sum + (t.Discount || 0), 0);

 return (
  <div className="p-4 space-y-4">

    {/* SEARCH BAR TOP RIGHT */}
    <div className="flex justify-end">
      <SearchBar search={search} setSearch={setSearch} />
    </div>

    {/* FILTERS + SORT IN SAME ROW */}
    <div className="flex flex-wrap items-center gap-4">
      <FilterPanel filters={filters} setFilters={setFilters} />

      <div className="inline-block">
        <SortDropdown
          sortField={sortField}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>

<div className="flex gap-3 mb-3">
  <div className="bg-white border border-gray-100 p-3 rounded-md text-gray-700 shadow-sm">
    <div className="flex items-center gap-1">
      Total Units sold: <BsExclamationCircle />
    </div>
    <div className="mt-1 font-semibold">{totalUnits}</div>
  </div>

  <div className="bg-white border border-gray-100 p-3 rounded-md text-gray-700 shadow-sm">
    <div className="flex items-center gap-1">
      Total Amount: <BsExclamationCircle />
    </div>
    <div className="mt-1 font-semibold">₹{totalAmount}</div>
  </div>

  <div className="bg-white border border-gray-100 p-3 rounded-md text-gray-700 shadow-sm">
    <div className="flex items-center gap-1">
      Total Discount: <BsExclamationCircle />
    </div>
    <div className="mt-1 font-semibold">₹{totalDiscount}</div>
  </div>
</div>
    <TransactionTable transactions={paginated} />
    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
  </div>
);
}