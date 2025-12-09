// transactions.js
import axios from "axios";

/**
 * Fetch transactions from backend with safe query params
 * @param {Object} filters - Filter object from frontend state
 */
export const fetchTransactions = async (filters = {}) => {
  try {
    // Axios handles query params safely
    const res = await axios.get("https://realestate-5-r482.onrender.com/api/transactions", {
      params: {
        search: filters.search || "",
        PhoneNumber: filters.PhoneNumber || "",
        Gender: filters.Gender || [],
        CustomerRegion: filters.CustomerRegion || [],
        ProductCategory: filters.ProductCategory || [],
        Tags: filters.Tags || [],
        PaymentMethod: filters.PaymentMethod || [],
        AgeMin: filters.AgeMin || "",
        AgeMax: filters.AgeMax || "",
        DateStart: filters.DateStart || "",
        DateEnd: filters.DateEnd || "",
        sortField: filters.sortField || "Date",
        sortOrder: filters.sortOrder || "desc",
        page: filters.page || 1,
        pageSize: filters.pageSize || 100000000,
      },
    });

    return res.data; // { data, total, page, pageSize, totalPages }
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    throw err; // let your component handle the error
  }
};
