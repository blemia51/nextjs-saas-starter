export function DashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Active Plan</h3>
        <p>Pro – $9/month</p>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Usage Stats</h3>
        <p>API Calls: 1,239 this month</p>
      </div>

      <div className="md:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="py-2">Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-2">2025-04-01</td>
              <td>€9.00</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td className="py-2">2025-03-01</td>
              <td>€9.00</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
