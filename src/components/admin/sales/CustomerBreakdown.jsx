function CustomerBreakdown({ newCustomers, returningCustomers }) {
  const total = newCustomers + returningCustomers;
  const newPct = total > 0 ? Math.round((newCustomers / total) * 100) : 0;

  return (
    <div className="bg-white border border-stone-200 rounded-md p-5">
      <h2 className="font-semibold text-stone-900 mb-4">Customers This Week</h2>

      {total === 0 ? (
        <p className="text-stone-500 text-sm">No customer data yet.</p>
      ) : (
        <>
          <div className="flex h-2 rounded-full overflow-hidden bg-stone-100 mb-4">
            <div className="bg-btn-primary" style={{ width: `${newPct}%` }} />
            <div
              className="bg-stone-300"
              style={{ width: `${100 - newPct}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-btn-primary" />
              <span className="text-stone-700">New</span>
              <span className="font-semibold text-stone-900">
                {newCustomers}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
              <span className="text-stone-700">Returning</span>
              <span className="font-semibold text-stone-900">
                {returningCustomers}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerBreakdown;
