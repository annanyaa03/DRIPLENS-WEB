export default function BrandDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-black mb-2">Brand Dashboard</h1>
      <p className="text-[#555555] mb-8">Manage your talent pool and active briefs.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Interface: Active Shortlist */}
        <div className="lg:col-span-2 space-y-8">
          <div className="driplens-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-black">My Shortlist</h2>
              <button className="text-sm text-[#555555] hover:text-black">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="border border-gray-200 rounded-[8px] p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-black text-sm">Creator Name</p>
                    <p className="text-xs text-gray-500">Videographer</p>
                  </div>
                  <button className="btn-primary text-xs py-1 px-3">Hire</button>
                </div>
              ))}
            </div>
          </div>

          <div className="driplens-card p-6">
            <h2 className="text-xl font-poppins font-bold text-black mb-6">Sent Requests Tracker</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-[#999999] uppercase tracking-wider">
                    <th className="pb-3 font-medium">Creator</th>
                    <th className="pb-3 font-medium">Project</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 last:border-0">
                     <td className="py-4 font-semibold text-black">Jane Doe</td>
                     <td className="py-4 text-gray-600">Summer Campaign</td>
                     <td className="py-4">
                       <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                     </td>
                     <td className="py-4">
                       <button className="text-gray-400 cursor-not-allowed">Message</button>
                     </td>
                  </tr>
                  <tr>
                     <td className="py-4 font-semibold text-black">John Smith</td>
                     <td className="py-4 text-gray-600">Product Shoot</td>
                     <td className="py-4">
                       <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Accepted</span>
                     </td>
                     <td className="py-4">
                       <button className="text-black font-semibold hover:underline">Message</button>
                     </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="driplens-card p-6 bg-black text-white">
            <h2 className="text-xl font-poppins font-bold mb-2">Post a Brief</h2>
            <p className="text-sm text-gray-400 mb-6">Send an open brief to our curated network of verified creators.</p>
            <form className="space-y-4">
              <div>
                <input type="text" placeholder="Project Title" className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white focus:outline-none focus:border-gray-500" />
              </div>
              <div>
                <input type="text" placeholder="Budget ($)" className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-white focus:outline-none focus:border-gray-500" />
              </div>
              <button className="w-full bg-white text-black font-bold py-2 rounded-[8px] hover:bg-gray-100 transition-colors">Submit Brief</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
