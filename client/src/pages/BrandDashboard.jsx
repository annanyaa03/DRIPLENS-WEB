import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

// ─── StatCard (mirrors CreatorDashboard pattern) ─────────────────────────────
function StatCard({ label, value, loading }) {
  return (
    <div className="driplens-card p-6 border-l-4 border-l-black">
      <p className="text-[#999] text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
      {loading
        ? <div className="h-10 w-24 bg-gray-100 animate-pulse rounded" />
        : <h2 className="text-4xl font-bold text-black">{value}</h2>
      }
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Pending:   'bg-yellow-100 text-yellow-800',
    Accepted:  'bg-green-100  text-green-800',
    Declined:  'bg-red-100    text-red-800',
    Completed: 'bg-blue-100   text-blue-800',
    Review:    'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BrandDashboard() {
  const { user } = useAuth();

  const [requests,    setRequests]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [form,        setForm]        = useState({
    creator_id: '', project_title: '', project_description: '', budget: '',
  });
  const [submitting,  setSubmitting]  = useState(false);
  const [formError,   setFormError]   = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // ── Fetch sent requests ───────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/hiring');
        const all  = res.data?.requests ?? [];
        // Only show requests this brand sent
        setRequests(all.filter(r => r.brand_id === user?.id));
      } catch (err) {
        console.error('Failed to load hiring requests:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) load();
  }, [user?.id]);

  // ── Derived stats ─────────────────────────────────────────────────────────
  const totalBriefs  = requests.length;
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const activeCount  = requests.filter(r => r.status === 'Accepted').length;

  // ── Form handlers ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (form.project_title.trim().length < 3) {
      setFormError('Project title must be at least 3 characters.');
      return;
    }
    if (form.project_description.trim().length < 10) {
      setFormError('Description must be at least 10 characters.');
      return;
    }
    const budgetNum = parseFloat(form.budget);
    if (!budgetNum || budgetNum <= 0) {
      setFormError('Enter a valid budget amount.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        project_title:       form.project_title.trim(),
        project_description: form.project_description.trim(),
        budget:              budgetNum,
        ...(form.creator_id.trim() && { creator_id: form.creator_id.trim() }),
      };
      const res = await api.post('/hiring', payload);
      const newRequest = res.data?.request;
      if (newRequest) setRequests(prev => [newRequest, ...prev]);
      setFormSuccess('Brief posted successfully!');
      setForm({ creator_id: '', project_title: '', project_description: '', budget: '' });
    } catch (err) {
      setFormError(err.message || 'Failed to post brief.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Brand Dashboard — Driplens</title>
        <meta name="description" content="Brand Dashboard on Driplens" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-black mb-1">
              Welcome back, {user?.username} 👋
            </h1>
            <p className="text-[#555555] text-sm">Manage your talent pool and active briefs.</p>
          </div>
          <Link to="/profile/edit" className="text-[10px] font-bold uppercase tracking-widest text-[#999] hover:text-black border-b border-[#DDD] hover:border-black pb-1 transition-all">
            Edit Profile
          </Link>
        </div>

        {/* ── StatCards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Briefs Sent"  value={totalBriefs}  loading={loading} />
          <StatCard label="Awaiting Response"  value={pendingCount} loading={loading} />
          <StatCard label="Active Projects"    value={activeCount}  loading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Sent Requests Tracker ── */}
          <div className="lg:col-span-2">
            <div className="driplens-card p-6">
              <h2 className="text-xl font-poppins font-bold text-black mb-6">Sent Requests Tracker</h2>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-14 bg-gray-50 animate-pulse rounded" />
                  ))}
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#999] text-sm mb-2">No briefs sent yet.</p>
                  <p className="text-xs text-[#bbb]">Use the form on the right to post your first brief.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#999999] uppercase tracking-wider text-xs">
                        <th className="pb-3 font-medium">Creator</th>
                        <th className="pb-3 font-medium">Project</th>
                        <th className="pb-3 font-medium">Budget</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requests.map(r => (
                        <tr key={r.id}>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {r.creator?.avatar_url
                                ? <img src={r.creator.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover bg-gray-200" />
                                : <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0" />
                              }
                              <span className="font-semibold text-black text-sm">
                                {r.creator?.username ?? '—'}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-600 max-w-[160px] truncate">{r.project_title}</td>
                          <td className="py-4 text-gray-800 font-medium whitespace-nowrap">
                            {r.budget != null ? `$${Number(r.budget).toLocaleString()}` : '—'}
                          </td>
                          <td className="py-4">
                            <StatusBadge status={r.status} />
                          </td>
                          <td className="py-4">
                            {r.status === 'Accepted' ? (
                              <Link to="/messages" className="text-black font-semibold hover:underline text-sm">
                                Message
                              </Link>
                            ) : (
                              <span className="text-gray-300 text-sm cursor-not-allowed">Message</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1 space-y-8">
            <div className="driplens-card p-6 bg-black text-white">
              <h2 className="text-xl font-poppins font-bold mb-1">Post a Brief</h2>
              <p className="text-sm text-gray-400 mb-6">
                Send a brief to a creator or open it to the network.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="creator_id"
                  value={form.creator_id}
                  onChange={handleChange}
                  placeholder="Creator ID (optional)"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                />
                <input
                  type="text"
                  name="project_title"
                  value={form.project_title}
                  onChange={handleChange}
                  placeholder="Project Title *"
                  required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                />
                <textarea
                  name="project_description"
                  value={form.project_description}
                  onChange={handleChange}
                  placeholder="Project Description *"
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
                />
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Budget ($) *"
                  required
                  min="1"
                  step="0.01"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                />

                {formError   && <p className="text-red-400   text-xs">{formError}</p>}
                {formSuccess && <p className="text-green-400 text-xs">{formSuccess}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white text-black font-bold py-2 rounded-[8px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit Brief'}
                </button>
              </form>
            </div>

            <Link
              to="/messages"
              className="block driplens-card p-4 text-center text-sm font-bold text-black hover:bg-black hover:text-white transition-all"
            >
              View All Messages →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
