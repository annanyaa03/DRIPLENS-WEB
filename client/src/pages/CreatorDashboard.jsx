export default function CreatorDashboard() {
  const stats = [
    { label: 'Total Profile Views', value: '2,845' },
    { label: 'Pending Inquiries', value: '3' },
    { label: 'Conversion Rate', value: '4.2%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-black mb-2">Welcome Back, Jane 👋</h1>
      <p className="text-[#555555] mb-8">Goal Tracker: Upload 2 more projects to improve visibility.</p>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="driplens-card p-6 border-l-4 border-l-black">
            <p className="text-[#999999] text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</p>
            <h2 className="text-4xl font-poppins font-bold text-black">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Interface */}
        <div className="lg:col-span-2 space-y-8">
          <div className="driplens-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-poppins font-bold text-black">Portfolio Manager</h2>
              <button className="btn-primary text-sm py-1.5">Add New Media</button>
            </div>
            {/* Simple List */}
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 bg-gray-200 rounded"></div>
                    <div>
                      <p className="font-medium text-black">Commercial Project {item}</p>
                      <p className="text-xs text-[#999999]">Uploaded 2 days ago</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-500 hover:text-red-700 font-medium">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="driplens-card p-6">
            <h2 className="text-xl font-poppins font-bold text-black mb-6">Recent Inquiries</h2>
            <div className="space-y-4">
              <div className="border border-[#E5E5E5] p-4 rounded-[8px]">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold text-black">Nike Campaign</p>
                  <p className="font-bold text-green-600">$2,500</p>
                </div>
                <p className="text-sm text-[#555555] mb-4">We're looking for an experienced videographer...</p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary py-1.5 text-xs">Accept</button>
                  <button className="flex-1 btn-secondary py-1.5 text-xs">Decline</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
