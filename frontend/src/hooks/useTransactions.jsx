import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/transactions';

export const useTransactions = (search, filters, sortField, sortOrder, page, pageSize = 10000) => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTransactions({ search, filters, sortField, sortOrder, page, pageSize });
      setTransactions(data.data);
      setTotalPages(data.totalPages);
    };
    load();
  }, [search, filters, sortField, sortOrder, page, pageSize]);

  return { transactions, totalPages };
};
