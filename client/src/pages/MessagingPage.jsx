export default function MessagingPage() {
  const conversations = [
    { id: 1, name: 'Nike', status: 'Accepted', preview: 'Sounds great, let\'s proceed.' },
    { id: 2, name: 'Apple', status: 'Pending', preview: 'We are reviewing your portfolio.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] flex gap-6">
      
      {/* Sidebar: Conversation List */}
      <div className="w-1/3 driplens-card overflow-y-auto hidden md:block">
        <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl">Messages</h2>
        <div className="divide-y divide-gray-100">
          {conversations.map((c) => (
            <div key={c.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-black">{c.name}</p>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${c.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{c.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 driplens-card flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <p className="font-poppins font-bold text-black">Nike • Summer Campaign</p>
            <p className="text-xs text-green-600 font-medium">Status: Accepted</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-black px-4 py-2 rounded-2xl rounded-tl-sm max-w-[70%] shadow-sm">
              <p className="text-sm">Hi Jane! We loved your recent portfolio update and want to hire you for our upcoming drop.</p>
              <p className="text-[10px] text-gray-400 text-right mt-1">10:00 AM</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[70%] shadow-sm">
              <p className="text-sm">Thank you! I'm available next week to start production. Sounds great, let's proceed.</p>
              <p className="text-[10px] text-gray-400 text-right mt-1">10:45 AM</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100">
          <form className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 border border-gray-300 rounded-[8px] px-4 py-2 focus:outline-none focus:border-black"
            />
            <button type="submit" className="btn-primary py-2 px-6">Send</button>
          </form>
        </div>
      </div>

    </div>
  );
}
