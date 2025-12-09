const Transaction = require('../models/Transaction');

async function getTransactions(queryParams) {
  const {
    search = '',
    Gender,
    CustomerRegion,
    ProductCategory,
    Tags,
    PaymentMethod,
    AgeMin,
    AgeMax,
    DateStart,
    DateEnd,
    sortField = 'Date',
    sortOrder = 'desc',
    page = 1,
    pageSize = 100000000,
  } = queryParams;

  const query = {};

  // ===== SEARCH (full-text, case-insensitive) =====
 const searchFields = [];
if (search.trim()) {
  searchFields.push(
    { CustomerName: { $regex: search.trim(), $options: 'i' } },
    { PhoneNumber: { $regex: search.trim(), $options: 'i' } }
  );
}
if (queryParams.PhoneNumber) {
  searchFields.push({ PhoneNumber: { $regex: queryParams.PhoneNumber.trim(), $options: 'i' } });
}

if (searchFields.length > 0) {
  query.$or = searchFields;
}


  // ===== FILTERS =====

  // Customer Region (multi-select)
  if (CustomerRegion) {
    const regions = Array.isArray(CustomerRegion) ? CustomerRegion : [CustomerRegion];
    query.CustomerRegion = { $in: regions.map(r => r.trim()) };
  }

  // Gender (strict exact match)
  if (Gender) {
    const genders = Array.isArray(Gender) ? Gender : [Gender];
    query.Gender = { $in: genders.map(g => g.trim().charAt(0).toUpperCase() + g.trim().slice(1).toLowerCase()) };
  }

  // Age Range
  if (AgeMin || AgeMax) {
    query.Age = {};
    if (AgeMin) query.Age.$gte = Number(AgeMin);
    if (AgeMax) query.Age.$lte = Number(AgeMax);
  }

  // Product Category (multi-select)
  if (ProductCategory) {
    const categories = Array.isArray(ProductCategory) ? ProductCategory : [ProductCategory];
    query.ProductCategory = { $in: categories.map(c => c.trim()) };
  }

  // Tags (match any, CSV stored in DB)
  if (Tags) {
    const tagsArray = Array.isArray(Tags) ? Tags : [Tags];
    query.Tags = {
      $elemMatch: { $in: tagsArray.map(t => t.trim().toLowerCase()) }
    };
  }

  // Payment Method (multi-select)
  if (PaymentMethod) {
    const methods = Array.isArray(PaymentMethod) ? PaymentMethod : [PaymentMethod];
    query.PaymentMethod = { $in: methods.map(p => p.trim()) };
  }

  // Date Range
  if (DateStart || DateEnd) {
    query.Date = {};
    if (DateStart) query.Date.$gte = new Date(DateStart);
    if (DateEnd) query.Date.$lte = new Date(DateEnd);
  }

  // ===== SORTING =====
  const sortableFields = ['Date', 'Quantity', 'CustomerName'];
  const sort = {};
  const field = sortableFields.includes(sortField) ? sortField : 'Date';
  sort[field] = sortOrder === 'desc' ? -1 : 1;

  // ===== PAGINATION =====
  const skip = (page - 1) * pageSize;

  const data = await Transaction.find(query)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .lean();

  const total = await Transaction.countDocuments(query);

  return {
    data,
    total,
    page: Number(page),
    pageSize: Number(pageSize),
    totalPages: Math.ceil(total / pageSize),
  };
}

module.exports = { getTransactions };
