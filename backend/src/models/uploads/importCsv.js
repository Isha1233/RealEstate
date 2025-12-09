const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../../..//.env' });

const Transaction = require('../Transaction');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

function toNumber(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

let batch = [];

fs.createReadStream('../transactions.csv')
  .pipe(csv())
  .on('data', (data) => {
    batch.push({
      TransactionID: toNumber(data['Transaction ID']),
Date: data['Date'],// so    f  
       CustomerID: data['Customer ID'],
  CustomerName: data['Customer Name'],//so   s 
     PhoneNumber: data['Phone Number'],// s 
     Gender: data['Gender'],// f 
     Age: toNumber(data['Age']),// f 
     CustomerRegion: data['Customer Region'],// f 
       ProductID: data['Product ID'],
     ProductCategory: data['Product Category'],// f 
    Tags: data['Tags'], // f 
   Quantity: toNumber(data['Quantity']),//  so  
      DiscountPercentage: toNumber(data['Discount Percentage']),
      TotalAmount: toNumber(data['Total Amount']),
      FinalAmount: toNumber(data['Final Amount']),
   PaymentMethod: data['Payment Method'],  // f 
      EmployeeName: data['Employee Name'],
    });
  })
  .on('end', async () => {
    await Transaction.deleteMany({});
    await Transaction.insertMany(batch);
    console.log("CSV import completed:", batch.length, "records added");
    process.exit();
  });
