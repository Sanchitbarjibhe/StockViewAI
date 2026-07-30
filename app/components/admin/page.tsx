'use client';

import { useEffect, useState } from 'react';

interface Entry {
  _id: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export default function AdminDashboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/entries');
      const data = await res.json();
      if (data.success) {
        setEntries(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch entries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Filter based on search query
  const filteredEntries = entries.filter(
    (e) =>
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.includes(search)
  );

  // Download Data as CSV File
  const exportToCSV = () => {
    const headers = 'ID,Email,Phone,Registered At\n';
    const rows = filteredEntries
      ? filteredEntries
        .map(
          (e) =>
            `"${e._id}","${e.email}","${e.phone}","${new Date(
              e.registeredAt
            ).toLocaleString()}"`
        )
        .join('\n')
      : '';
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neo_mvp_entries_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              NEO AI <span className="text-emerald-400">Admin Terminal</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Monitor live MVP signups & waitlist entries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEntries}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-lg transition border border-slate-700"
            >
              🔄 Refresh
            </button>
            <button
              onClick={exportToCSV}
              disabled={filteredEntries.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{entries.length}</p>
          </div>
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center">
            <input
              type="text"
              placeholder="Search by Email or Phone number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Date Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-500">
                      Loading live entries...
                    </td>
                  </tr>
                ) : filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-500">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((item, index) => (
                    <tr key={item._id} className="hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6 text-slate-500 font-mono text-xs">{index + 1}</td>
                      <td className="py-4 px-6 font-medium text-slate-200">{item.email}</td>
                      <td className="py-4 px-6 font-mono text-slate-300">
                        {item.phone || <span className="text-slate-600">N/A</span>}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs">
                        {new Date(item.registeredAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}