const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  TransactionID: Number,
  Date: String, // so f
  CustomerID: String,
  CustomerName: String, // so s
  PhoneNumber: String, // s
  Gender: String, // f
  Age: Number, // f
  CustomerRegion: String, // f
  ProductID: String,
  ProductCategory: String, // f
  Tags: String, // f
  Quantity: Number, // so
  DiscountPercentage: Number,
  TotalAmount: Number,
  FinalAmount: Number,
  PaymentMethod: String, // f
  EmployeeName: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
