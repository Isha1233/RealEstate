import { TfiSearch } from "react-icons/tfi";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-0.5 relative w-72 float-right">
      <input
        type="text"
        placeholder="Name, Phone no."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 pl-8 border border-gray-100 rounded bg-gray-100 shadow-sm w-full"
      />
      <TfiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
