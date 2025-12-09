import { RiResetLeftFill } from "react-icons/ri";

export default function FilterPanel({ filters, setFilters }) {
 const handleChange = (e) => {
  const { name, value, type, checked, options } = e.target;

  // --- DATE RANGE LOGIC ---
  if (name === "DateRange") {
    let newFilters = { ...filters, DateRange: value };

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (value === "today") {
      newFilters.DateFrom = today.toISOString().slice(0, 10);
      newFilters.DateTo = today.toISOString().slice(0, 10);
    } else if (value === "week") {
      newFilters.DateFrom = startOfWeek.toISOString().slice(0, 10);
      newFilters.DateTo = today.toISOString().slice(0, 10);
    } else if (value === "month") {
      newFilters.DateFrom = startOfMonth.toISOString().slice(0, 10);
      newFilters.DateTo = today.toISOString().slice(0, 10);
    } else if (value === "custom") {
      newFilters.DateFrom = "";
      newFilters.DateTo = "";
    } else {
      newFilters.DateFrom = "";
      newFilters.DateTo = "";
    }

    setFilters(newFilters);
    return;
  }

  // --- AGE RANGE FIX ---
  if (name === "AgeRange") {
    if (value === "") {
      setFilters({ ...filters, AgeMin: "", AgeMax: "", AgeRange: "" });
      return;
    }

    const [min, max] = value.split("-");

    setFilters({
      ...filters,
      AgeRange: value,
      AgeMin: Number(min),
      AgeMax: max === "50+" ? 200 : Number(max),
    });

    return;
  }

  // --- NORMAL UPDATE ---
  if (type === "select-multiple") {
    const selected = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setFilters({ ...filters, [name]: selected });
  } else if (type === "checkbox") {
    setFilters({ ...filters, [name]: checked });
  } else {
    setFilters({ ...filters, [name]: value });
  }
};

const resetFilters = () => {
  setFilters({
    search: "",
    CustomerRegion: "",
    Gender: "",
    AgeRange: "",
    AgeMin: "",
    AgeMax: "",
    ProductCategory: "",
    Tags: [],
    PaymentMethod: "",
    DateRange: "",
    DateFrom: "",
    DateTo: ""
  });
};

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">

    <button
  onClick={resetFilters}
  className="p-2 rounded-xl hover:bg-gray-100 bg-gray-100"
>
  <RiResetLeftFill className="w-5 h-5 text-gray-700" />
</button>

<select
  name="CustomerRegion"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Customer Region</option>
  <option>North</option>
  <option>South</option>
  <option>East</option>
  <option>West</option>
  <option>Central</option>
</select>

<select
  name="Gender"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Gender</option>
  <option>Male</option>
  <option>Female</option>
</select>

<select
  name="AgeRange"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Age Range</option>
  <option value="18-25">18–25</option>
  <option value="26-35">26–35</option>
  <option value="36-50">36–50</option>
  <option value="50+">50+</option>
</select>

<select
  name="ProductCategory"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Product Category</option>
  <option>Clothing</option>
  <option>Electronics</option>
</select>

<select
  name="Tags"
  onChange={(e) => {
    const value = e.target.value;
    let newTags = filters.Tags ? [...filters.Tags] : [];
    if (!newTags.includes(value)) newTags.push(value);
    else newTags = newTags.filter((t) => t !== value);
    setFilters({ ...filters, Tags: newTags });
  }}
  value=""
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Tags</option>
  <option value="fashion">fashion</option>
  <option value="gadgets">gadgets</option>
  <option value="makeup">makeup</option>
  <option value="unisex">unisex</option>
  <option value="accessories">accessories</option>
  <option value="beauty">beauty</option>
  <option value="portable">portable</option>
  <option value="cotton">cotton</option>
  <option value="formal">formal</option>
  <option value="casual">casual</option>
  <option value="skincare">skincare</option>
</select>

<select
  name="PaymentMethod"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Payment Method</option>
  <option>Cash</option>
  <option>Card</option>
  <option>UPI</option>
</select>

<select
  name="DateRange"
  onChange={handleChange}
  className="p-2 rounded bg-gray-100 shadow-sm"
>
  <option value="">Date Range</option>
  <option value="today">Today</option>
  <option value="week">This Week</option>
  <option value="month">This Month</option>
  <option value="custom">Custom</option>
</select>

{filters.DateRange === "custom" && (
  <>
    <input
      type="date"
      name="DateFrom"
      onChange={handleChange}
      className="p-2 rounded bg-gray-100 shadow-sm"
    />
    <input
      type="date"
      name="DateTo"
      onChange={handleChange}
      className="p-2 rounded bg-gray-100 shadow-sm"
    />
  </>
)}
  </div>
  );
}
