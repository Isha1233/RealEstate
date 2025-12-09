// transactionController.js
import transactionService from '../services/transactionService.js';

export async function fetchTransactions(req, res) {
  try {
    const result = await transactionService.getTransactions(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
