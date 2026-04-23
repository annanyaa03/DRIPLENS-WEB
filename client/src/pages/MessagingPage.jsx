import { useEffect, useState, useRef } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Helmet } from 'react-helmet-async';

// ─── Status badge colour helper ───────────────────────────────────────────────
function statusClass(status) {
  if (status === 'Accepted' || status === 'Completed') return 'bg-green-100 text-green-800';
  if (status === 'Declined') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
}

export default function MessagingPage() {
  const { user: currentUser } = useAuth();
  const socket = useSocket();

  const [requests,        setRequests]        = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [messages,        setMessages]        = useState([]);
  const [newMessage,      setNewMessage]      = useState('');
  const [isOtherTyping,   setIsOtherTyping]   = useState(false);
  const [presence,        setPresence]        = useState({}); // { userId: 'online' | 'offline' }

  // Mobile view: 'list' | 'chat'
  const [mobileView, setMobileView] = useState('list');

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const typingTimeoutRef = useRef(null);

  // ── Load conversations ────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get('/hiring');
        const reqs = data.data?.requests ?? [];
        setRequests(reqs);
        if (reqs.length > 0 && !activeRequestId) setActiveRequestId(reqs[0].id);
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    };
    load();
  }, [activeRequestId]);

  // ── Load messages + Socket listeners ──────────────────────────────────────
  useEffect(() => {
    if (!activeRequestId) return;

    const load = async () => {
      try {
        const data = await api.get(`/messages/${activeRequestId}`);
        setMessages(data.data?.messages ?? []);
        
        // Mark as read when loading
        if (socket) {
          const req = requests.find(r => r.id === activeRequestId);
          const otherId = currentUser.role === 'creator' ? req?.brand_id : req?.creator_id;
          socket.emit('message_read', { recipientId: otherId, requestId: activeRequestId });
          await api.patch(`/messages/${activeRequestId}/read`);
        }
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };
    load();
  }, [activeRequestId, socket, currentUser.role, requests]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg) => {
      if (msg.hiring_request_id === activeRequestId) {
        setMessages(prev => [...prev, msg]);
        
        // Mark as read immediately if chat is open
        const req = requests.find(r => r.id === activeRequestId);
        const otherId = currentUser.role === 'creator' ? req?.brand_id : req?.creator_id;
        socket.emit('message_read', { recipientId: otherId, requestId: activeRequestId });
      }
    };

    const handleTyping = ({ requestId }) => {
      if (requestId === activeRequestId) setIsOtherTyping(true);
    };

    const handleStopTyping = ({ requestId }) => {
      if (requestId === activeRequestId) setIsOtherTyping(false);
    };

    const handleReadReceipt = ({ requestId }) => {
      if (requestId === activeRequestId) {
        setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
      }
    };

    const handlePresence = ({ userId, status }) => {
      setPresence(prev => ({ ...prev, [userId]: status }));
    };

    const handleHiringUpdate = (updatedReq) => {
      setRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));
    };

    socket.on('receive_message', handleMessage);
    socket.on('user_typing', handleTyping);
    socket.on('user_stop_typing', handleStopTyping);
    socket.on('read_receipt', handleReadReceipt);
    socket.on('presence_update', handlePresence);
    socket.on('hiring_update', handleHiringUpdate);

    return () => {
      socket.off('receive_message', handleMessage);
      socket.off('user_typing', handleTyping);
      socket.off('user_stop_typing', handleStopTyping);
      socket.off('read_receipt', handleReadReceipt);
      socket.off('presence_update', handlePresence);
      socket.off('hiring_update', handleHiringUpdate);
    };
  }, [socket, activeRequestId, requests, currentUser.role]);

  // ── Auto-scroll to latest message ─────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOtherTyping]);

  // ── Send ──────────────────────────────────────────────────────────────────
  const sendMessage = async (e) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content || !activeRequestId) return;
    setNewMessage('');
    
    // Stop typing immediately
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      handleStopTypingEmit();
    }

    try {
      const res = await api.post(`/messages/${activeRequestId}`, { content });
      // The socket emission happens on backend, but we can optimistically update or wait for socket
      // To avoid double messages if we listen to our own emits (we don't), we add it here
      setMessages(prev => [...prev, res.data.message]);
    } catch (err) {
      console.error(err);
      setNewMessage(content); // restore on failure
    }
  };

  const handleTypingEmit = () => {
    if (!socket || !activeRequestId) return;
    const req = requests.find(r => r.id === activeRequestId);
    const otherId = currentUser.role === 'creator' ? req?.brand_id : req?.creator_id;
    socket.emit('typing', { recipientId: otherId, requestId: activeRequestId });
  };

  const handleStopTypingEmit = () => {
    if (!socket || !activeRequestId) return;
    const req = requests.find(r => r.id === activeRequestId);
    const otherId = currentUser.role === 'creator' ? req?.brand_id : req?.creator_id;
    socket.emit('stop_typing', { recipientId: otherId, requestId: activeRequestId });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    if (!socket) return;

    if (!typingTimeoutRef.current) {
      handleTypingEmit();
    } else {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTypingEmit();
      typingTimeoutRef.current = null;
    }, 2000);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getOtherParty = (req) => {
    if (!currentUser) return null;
    return currentUser.role === 'creator' ? req.brand : req.creator;
  };

  const handleSelectConversation = (id) => {
    setActiveRequestId(id);
    setMessages([]);
    setIsOtherTyping(false);
    setMobileView('chat');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBack = () => {
    setMobileView('list');
  };

  const activeReq  = requests.find(r => r.id === activeRequestId);
  const otherParty = activeReq ? getOtherParty(activeReq) : null;
  const isOnline   = otherParty && presence[otherParty.id] === 'online';

  // ── Components ────────────────────────────────────────────────────────────
  const ConversationList = () => (
    <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
      {requests.length === 0 ? (
        <p className="p-6 text-sm text-gray-400">No conversations yet.</p>
      ) : (
        requests.map((r) => {
          const party    = getOtherParty(r);
          const isActive = activeRequestId === r.id;
          const userOnline = party && presence[party.id] === 'online';
          return (
            <button
              key={r.id}
              onClick={() => handleSelectConversation(r.id)}
              className={`w-full text-left p-4 transition-colors relative ${
                isActive ? 'bg-gray-50 border-l-2 border-black' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-sm ${isActive ? 'text-black' : 'text-gray-800'}`}>
                    {party?.username ?? 'Unknown'}
                  </p>
                  {userOnline && <div className="w-2 h-2 rounded-full bg-green-500" />}
                </div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${statusClass(r.status)}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{r.project_title}</p>
            </button>
          );
        })
      )}
    </div>
  );

  const ChatPanel = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white flex-shrink-0">
        <button
          onClick={handleBack}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative">
          {otherParty?.avatar_url ? (
            <img
              src={otherParty.avatar_url}
              alt=""
              className="w-9 h-9 rounded-full object-cover bg-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
          )}
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="min-w-0">
          <p className="font-poppins font-bold text-black text-sm truncate">
            {otherParty?.username ?? 'Unknown'}
            <span className="text-gray-400 font-normal"> · </span>
            <span className="text-gray-600 font-normal">{activeReq?.project_title}</span>
          </p>
          <p className={`text-xs font-medium ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
            {isOnline ? 'Online now' : activeReq?.status}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mt-8">No messages yet. Say hello!</p>
        ) : (
          messages.map((m, i) => {
            const isMe = m.sender_id === currentUser?.id;
            return (
              <div key={m.id ?? i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 max-w-[75%] shadow-sm relative ${
                  isMe
                    ? 'bg-black text-white rounded-2xl rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-black rounded-2xl rounded-tl-sm'
                }`}>
                  <p className="text-sm break-words">{m.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-[10px] text-gray-400">
                      {m.created_at
                        ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : 'Sending…'}
                    </p>
                    {isMe && (
                      <div className="flex">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={m.is_read ? 'text-blue-400' : 'text-gray-400'}>
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          {m.is_read && <path d="M16 6L7 15L2 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(4,0)"/>}
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        {isOtherTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
        <form className="flex gap-2" onSubmit={sendMessage}>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message…"
            className="flex-1 border border-gray-200 rounded-[8px] px-4 py-2.5 text-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="btn-primary py-2 px-5 text-sm disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Messages — Driplens</title>
      </Helmet>

      <div className="md:hidden h-[calc(100vh-64px)] flex flex-col bg-white">
        {mobileView === 'list' ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl flex-shrink-0">Messages</h2>
            <ConversationList />
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            {activeReq ? <ChatPanel /> : <div className="p-10 text-center">Conversation not found</div>}
          </div>
        )}
      </div>

      <div className="hidden md:flex max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] gap-6">
        <div className="w-1/3 flex flex-col border border-gray-100 rounded-[8px] bg-white overflow-hidden shadow-sm">
          <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl flex-shrink-0">Messages</h2>
          <ConversationList />
        </div>
        <div className="flex-1 flex flex-col border border-gray-100 rounded-[8px] bg-white overflow-hidden shadow-sm">
          {!activeReq ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Select a conversation to start messaging.</div>
          ) : (
            <ChatPanel />
          )}
        </div>
      </div>
    </>
  );
}
