import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

// ─── Status badge colour helper ───────────────────────────────────────────────
function statusClass(status) {
  if (status === 'Accepted' || status === 'Completed') return 'bg-green-100 text-green-800';
  if (status === 'Declined') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
}

export default function MessagingPage() {
  const { user: currentUser } = useAuth();

  const [requests,        setRequests]        = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [messages,        setMessages]        = useState([]);
  const [newMessage,      setNewMessage]      = useState('');

  // Mobile view: 'list' | 'chat'
  const [mobileView, setMobileView] = useState('list');

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // ── Load conversations ────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get('/hiring');
        const reqs = data.data?.requests ?? [];
        setRequests(reqs);
        // On desktop, auto-select first conversation
        if (reqs.length > 0) setActiveRequestId(reqs[0].id);
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    };
    load();
  }, []);

  // ── Load messages + subscribe to realtime ────────────────────────────────
  useEffect(() => {
    if (!activeRequestId) return;

    const load = async () => {
      try {
        const data = await api.get(`/messages/${activeRequestId}`);
        setMessages(data.data?.messages ?? []);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };
    load();

    const channel = supabase
      .channel(`messages:${activeRequestId}`)
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'messages',
          filter: `hiring_request_id=eq.${activeRequestId}`,
        },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [activeRequestId]);

  // ── Auto-scroll to latest message ─────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send ──────────────────────────────────────────────────────────────────
  const sendMessage = async (e) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content || !activeRequestId) return;
    setNewMessage('');
    try {
      await api.post(`/messages/${activeRequestId}`, { content });
    } catch (err) {
      console.error(err);
      setNewMessage(content); // restore on failure
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getOtherParty = (req) => {
    if (!currentUser) return null;
    return currentUser.role === 'creator' ? req.brand : req.creator;
  };

  const handleSelectConversation = (id) => {
    setActiveRequestId(id);
    setMessages([]);
    setMobileView('chat');
    // slight delay so the panel is mounted before focusing input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBack = () => {
    setMobileView('list');
  };

  const activeReq  = requests.find(r => r.id === activeRequestId);
  const otherParty = activeReq ? getOtherParty(activeReq) : null;

  // ── Conversation list (shared between mobile + desktop sidebar) ───────────
  const ConversationList = () => (
    <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
      {requests.length === 0 ? (
        <p className="p-6 text-sm text-gray-400">No conversations yet.</p>
      ) : (
        requests.map((r) => {
          const party    = getOtherParty(r);
          const isActive = activeRequestId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleSelectConversation(r.id)}
              className={`w-full text-left p-4 transition-colors ${
                isActive ? 'bg-gray-50 border-l-2 border-black' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className={`font-semibold text-sm ${isActive ? 'text-black' : 'text-gray-800'}`}>
                  {party?.username ?? 'Unknown'}
                </p>
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

  // ── Chat panel (shared between mobile + desktop) ──────────────────────────
  const ChatPanel = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white flex-shrink-0">
        {/* Back button — mobile only */}
        <button
          onClick={handleBack}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Back to conversations"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {otherParty?.avatar_url ? (
          <img
            src={otherParty.avatar_url}
            alt=""
            className="w-9 h-9 rounded-full object-cover bg-gray-200 flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
        )}

        <div className="min-w-0">
          <p className="font-poppins font-bold text-black text-sm truncate">
            {otherParty?.username ?? 'Unknown'}
            <span className="text-gray-400 font-normal"> · </span>
            <span className="text-gray-600 font-normal">{activeReq?.project_title}</span>
          </p>
          <p className={`text-xs font-medium ${
            activeReq?.status === 'Accepted' || activeReq?.status === 'Completed'
              ? 'text-green-600'
              : 'text-gray-400'
          }`}>
            {activeReq?.status}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mt-8">
            No messages yet. Say hello!
          </p>
        ) : (
          messages.map((m, i) => {
            const isMe = m.sender_id === currentUser?.id;
            return (
              <div key={m.id ?? i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 max-w-[75%] shadow-sm ${
                  isMe
                    ? 'bg-black text-white rounded-2xl rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-black rounded-2xl rounded-tl-sm'
                }`}>
                  <p className="text-sm break-words">{m.content}</p>
                  <p className="text-[10px] text-gray-400 text-right mt-1">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Sending…'
                    }
                  </p>
                </div>
              </div>
            );
          })
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
            onChange={(e) => setNewMessage(e.target.value)}
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Messages — Driplens</title>
        <meta name="description" content="Messages on Driplens" />
      </Helmet>

      {/* ── MOBILE layout (< md) ── */}
      <div className="md:hidden h-[calc(100vh-64px)] flex flex-col bg-white">
        {mobileView === 'list' ? (
          // Full-screen conversation list
          <div className="flex flex-col flex-1 overflow-hidden">
            <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl flex-shrink-0">
              Messages
            </h2>
            <ConversationList />
          </div>
        ) : (
          // Full-screen chat panel
          <div className="flex flex-col flex-1 overflow-hidden">
            {activeReq ? (
              <ChatPanel />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
                <p className="text-sm">Conversation not found.</p>
                <button onClick={handleBack} className="text-black text-sm font-semibold underline">
                  ← Back
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── DESKTOP layout (≥ md) ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] gap-6">
        {/* Sidebar */}
        <div className="w-1/3 flex flex-col border border-gray-100 rounded-[8px] bg-white overflow-hidden shadow-sm">
          <h2 className="p-4 border-b border-gray-100 font-poppins font-bold text-xl flex-shrink-0">
            Messages
          </h2>
          <ConversationList />
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col border border-gray-100 rounded-[8px] bg-white overflow-hidden shadow-sm">
          {!activeReq ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a conversation to start messaging.
            </div>
          ) : (
            <ChatPanel />
          )}
        </div>
      </div>
    </>
  );
}
