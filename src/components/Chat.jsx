import React, { useEffect, useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

const Chat = ({ username, userColor }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(200);

            if (error) {
                console.error('Error fetching messages:', error);
                setMessages([
                    { id: 1, username: 'SYSTEM', content: '🔥 WELCOME TO THE PIT. START INSULTING.', created_at: new Date().toISOString(), color: '#dc2626' },
                ]);
            } else {
                setMessages(data || []);
            }
        };

        fetchMessages();

        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prev) => [...prev, payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        setSending(true);
        const messageToSend = {
            username,
            content: newMessage.trim(),
            color: userColor,
        };

        const { error } = await supabase
            .from('messages')
            .insert([messageToSend]);

        if (error) {
            console.error('Error sending message:', error);
            setError('FAILED TO SEND. TRY AGAIN.');
            setTimeout(() => setError(null), 3000);
        } else {
            setNewMessage('');
        }
        setSending(false);
        inputRef.current?.focus();
    };

    // Generate a consistent color from username if no color saved
    const getMessageBg = (msg) => {
        if (msg.color) {
            return { backgroundColor: msg.color + '20', borderColor: msg.color };
        }
        // Fallback for old messages without color
        return { backgroundColor: '#27272a', borderColor: '#3f3f46' };
    };

    return (
        <div className="flex flex-col h-screen bg-black text-white font-mono">
            {/* Header */}
            <header className="px-4 py-3 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                        FUCK YOU!
                    </div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider hidden sm:block">
                        PUBLIC CHAT
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: userColor }}
                    />
                    <span className="text-xs text-zinc-400 font-bold uppercase">
                        {username}
                    </span>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-gradient-to-b from-zinc-950 to-black">
                {messages.length === 0 && (
                    <div className="text-center text-zinc-700 text-sm py-10">
                        NO MESSAGES YET. BE THE FIRST TO INSULT.
                    </div>
                )}
                {messages.map((msg) => {
                    const bgStyle = getMessageBg(msg);
                    const isOwn = msg.username === username;
                    return (
                        <div
                            key={msg.id}
                            className={`p-3 rounded-sm border-l-2 transition-colors ${isOwn ? 'ml-8' : 'mr-8'}`}
                            style={bgStyle}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className="font-bold text-xs uppercase"
                                    style={{ color: msg.color || '#a1a1aa' }}
                                >
                                    {msg.username === 'SYSTEM' ? '🔥 SYSTEM' : msg.username}
                                </span>
                                <span className="text-[10px] text-zinc-600">
                                    {msg.created_at ? format(new Date(msg.created_at), 'HH:mm') : ''}
                                </span>
                            </div>
                            <div className="text-zinc-200 text-sm sm:text-base break-words leading-relaxed">
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Error Toast */}
            {error && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-red-950 border border-red-600 text-white px-4 py-2 rounded text-xs font-bold uppercase">
                    {error}
                </div>
            )}

            {/* Input */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-900">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="TYPE YOUR INSULT..."
                        maxLength={500}
                        className="flex-1 bg-black border-2 border-zinc-800 text-white px-3 py-3 text-sm focus:border-red-600 focus:outline-none rounded-none transition-colors placeholder-zinc-700"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="bg-gradient-to-r from-red-700 to-red-600 text-white px-4 sm:px-6 py-3 font-black hover:from-red-600 hover:to-red-500 transition-all uppercase disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 border border-red-500/50 text-sm"
                    >
                        <Send size={16} />
                        <span className="hidden sm:inline">SEND</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
