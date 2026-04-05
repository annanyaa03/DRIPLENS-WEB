import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function MessagingPage() {
  const [requests, setRequests] = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!activeRequestId) return;

    fetchMessages(activeRequestId);

    // Subscribe to realtime inserts for this specific request
    const channel = supabase
      .channel(`messages:${activeRequestId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `hiring_request_id=eq.${activeRequestId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [activeRequestId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/hiring', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.requests) {
        setRequests(data.requests);
        if (data.requests.length > 0 && !activeRequestId) {
          setActiveRequestId(data.requests[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const fetchMessages = async (reqId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${reqId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeRequestId) return;

    const token = localStorage.getItem('token');
    const content = newMessage;
    setNewMessage(''); // optimistic clear

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${activeRequestId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ content })
      });
      // The realtime subscription will pick up the new message
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const getOtherParty = (req) => {
    if (!currentUser) return null;
    return currentUser.role === 'creator' ? req.brand : req.creator;
  };

  const activeReq = requests.find(r => r.id === activeRequestId);
  const otherParty = activeReq ? getOtherParty(activeReq) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] flex gap-6">
      
      {/* Sidebar: Conversation List */}
      <div className="w-1/3 driplens-card flex flex-col hidden md:flex border border-gray-100 rounded-[8px] bg-white overflow-hidden">
        <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl">Messages</h2>
        <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
          {requests.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No conversations yet.</p>
          ) : (
            requests.map((r) => {
              const party = getOtherParty(r);
              const isActive = activeRequestId === r.id;
              return (
                <div 
                  key={r.id} 
                  onClick={() => setActiveRequestId(r.id)}
                  className={`p-4 cursor-pointer transition-colors ${isActive ? 'bg-gray-50 border-l-2 border-black' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-semibold ${isActive ? 'text-black' : 'text-gray-800'}`}>
                      {party?.username || 'Unknown'}
                    </p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${r.status === 'Accepted' || r.status === 'Completed' ? 'bg-green-100 text-green-800' : r.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{r.project_title}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 driplens-card flex flex-col border border-gray-100 rounded-[8px] bg-white overflow-hidden">
        {!activeReq ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start messaging.
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-white">
              {otherParty?.avatar_url ? (
                <img src={otherParty.avatar_url} alt="avatar" className="w-10 h-10 bg-gray-200 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              )}
              <div>
                <p className="font-poppins font-bold text-black">{otherParty?.username || 'Unknown'} • {activeReq.project_title}</p>
                <p className={`text-xs font-medium ${activeReq.status === 'Accepted' || activeReq.status === 'Completed' ? 'text-green-600' : 'text-gray-500'}`}>
                  Status: {activeReq.status}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-center text-sm text-gray-400 mt-4">No messages yet. Send one to start!</p>
              ) : (
                messages.map((m, i) => {
                  const isMe = m.sender_id === currentUser?.id;
                  return (
                    <div key={m.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${isMe ? 'bg-black text-white rounded-2xl rounded-tr-sm' : 'bg-white border border-gray-200 text-black rounded-2xl rounded-tl-sm'} px-4 py-2 max-w-[70%] shadow-sm`}>
                        <p className="text-sm break-words">{m.content}</p>
                        <p className={`text-[10px] ${isMe ? 'text-gray-400' : 'text-gray-400'} text-right mt-1`}>
                          {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) : 'Sending...'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form className="flex gap-2" onSubmit={sendMessage}>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 border border-gray-300 rounded-[8px] px-4 py-2 focus:outline-none focus:border-black"
                />
                <button type="submit" disabled={!newMessage.trim()} className="btn-primary py-2 px-6 disabled:opacity-50">Send</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
