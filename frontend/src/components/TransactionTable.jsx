export default function TransactionTable({ transactions = [] }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <p className="p-4">No transactions found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* Rounded box wrapper */}
      <div className="text-gray-600 shadow-md p-4 border border-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
  <tr>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Transaction ID</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Date</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Customer ID</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Customer Name</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Phone Number</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Gender</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Age</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Product Category</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Quantity</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Total Amount</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Customer Region</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Product ID</th>
    <th className="p-2 border-b border-gray-200 text-left font-normal">Employee Name</th>
  </tr>
</thead>


          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="text-gray-700 hover:bg-gray-50 ">
                <td className="p-2 border-b border-gray-200">{t.TransactionID}</td>
                <td className="p-2 border-b border-gray-200">{t.Date}</td>
                <td className="p-2 border-b border-gray-200">{t.CustomerID}</td>
                <td className="p-2 border-b border-gray-200">{t.CustomerName}</td>
                <td className="p-2 border-b border-gray-200">{t.PhoneNumber}</td>
                <td className="p-2 border-b border-gray-200">{t.Gender}</td>
                <td className="p-2 border-b border-gray-200">{t.Age}</td>
                <td className="p-2 border-b border-gray-200">{t.ProductCategory}</td>
                <td className="p-2 border-b border-gray-200">{t.Quantity}</td>
                <td className="p-2 border-b border-gray-200">{t.TotalAmount}</td>
                <td className="p-2 border-b border-gray-200">{t.CustomerRegion}</td>
                <td className="p-2 border-b border-gray-200">{t.ProductID}</td>
                <td className="p-2 border-b border-gray-200">{t.EmployeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
