export default function SortDropdown({
  sortField,
  setSortField,
  setSortOrder,
}) {
  // Always keep sorting as ASC
  const handleFieldChange = (e) => {
    setSortField(e.target.value);
    setSortOrder("asc"); // default
  };

  return (
    <div className=" flex items-center gap-3 p-2 border rounded bg-white shadow-sm">
      <span className="text-gray-600 ">Sort by:</span>

      <select
        value={sortField}
        onChange={handleFieldChange}
        className="">
        <option value="">Select Field</option>
        <option value="CustomerName">Customer Name</option>
        <option value="Date">Date</option>
        <option value="Quantity">Quantity</option>
      </select>
    </div>
  );
}
