export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-poppins font-bold text-black mb-8">Discover Creators</h1>
      
      <div className="flex space-x-4 mb-8 border-b-2 border-[#E5E5E5] pb-2">
        <button className="text-lg font-inter font-medium border-b-2 border-black -mb-[10px] pb-2 px-2">All</button>
        <button className="text-lg font-inter font-medium text-gray-500 hover:text-black px-2 pb-2">Videographers</button>
        <button className="text-lg font-inter font-medium text-gray-500 hover:text-black px-2 pb-2">Photographers</button>
        <button className="text-lg font-inter font-medium text-gray-500 hover:text-black px-2 pb-2">Designers</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="driplens-card overflow-hidden group cursor-pointer">
            <div className="aspect-square bg-gray-200 relative mb-2">
               <div className="absolute top-3 right-3 bg-black text-white px-2 py-0.5 rounded-full text-[10px] font-bold z-10">
                 VERIFIED
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200"></div>
            </div>
            <div className="p-4">
              <h3 className="font-poppins font-semibold text-lg text-black">Creator Name</h3>
              <p className="text-sm text-[#999999] mb-4">Videographer • New York</p>
              <button className="w-full btn-secondary py-1 text-sm">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
