import React, { useState } from 'react';

const COLORS = [
    { name: 'Red', value: '#dc2626', bg: 'bg-red-600' },
    { name: 'Orange', value: '#ea580c', bg: 'bg-orange-600' },
    { name: 'Yellow', value: '#ca8a04', bg: 'bg-yellow-600' },
    { name: 'Green', value: '#16a34a', bg: 'bg-green-600' },
    { name: 'Cyan', value: '#0891b2', bg: 'bg-cyan-600' },
    { name: 'Blue', value: '#2563eb', bg: 'bg-blue-600' },
    { name: 'Purple', value: '#9333ea', bg: 'bg-purple-600' },
    { name: 'Pink', value: '#db2777', bg: 'bg-pink-600' },
];

const Login = ({ onJoin }) => {
    const [username, setUsername] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
    const [step, setStep] = useState(1); // 1 = username, 2 = color, 3 = motivation

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            setStep(2);
        }
    };

    const handleColorSubmit = () => {
        setStep(3);
    };

    const handleEnterChat = () => {
        onJoin(username.trim(), selectedColor);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 py-12 text-center relative overflow-hidden">
            {/* CA Badge */}
            <div className="absolute top-4 left-4 text-xs text-zinc-600 font-mono uppercase tracking-wider">
                CA: UPDATING..
            </div>

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

            {step === 1 && (
                /* STEP 1: Username */
                <div className="relative z-10 w-full max-w-sm animate-fadeIn">
                    <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 mb-3 tracking-tighter drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
                        FUCK YOU!
                    </h1>
                    <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-10">
                        $FUCKYOU COIN OFFICIAL CHAT
                    </p>

                    <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ENTER YOUR NAME, BITCH"
                            maxLength={16}
                            className="w-full bg-zinc-950 border-2 border-zinc-800 text-white p-4 font-mono text-center focus:border-red-600 focus:outline-none transition-all rounded-none uppercase placeholder-zinc-700 text-base tracking-wider"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!username.trim()}
                            className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white font-black py-4 hover:from-red-600 hover:to-red-500 transition-all uppercase disabled:opacity-30 disabled:cursor-not-allowed text-lg tracking-widest border border-red-500/50 shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                        >
                            CONTINUE →
                        </button>
                    </form>
                </div>
            )}

            {step === 2 && (
                /* STEP 2: Color Picker */
                <div className="relative z-10 w-full max-w-sm animate-fadeIn">
                    <div className="text-4xl mb-4">🎨</div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        PICK YOUR COLOR
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-8">
                        This will be your message background
                    </p>

                    <div className="grid grid-cols-4 gap-3 mb-8">
                        {COLORS.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => setSelectedColor(color.value)}
                                className={`aspect-square rounded-sm transition-all ${selectedColor === color.value
                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                                    : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleColorSubmit}
                        className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white font-black py-4 hover:from-red-600 hover:to-red-500 transition-all uppercase text-lg tracking-widest border border-red-500/50 shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                    >
                        NEXT →
                    </button>
                </div>
            )}

            {step === 3 && (
                /* STEP 3: Motivation */
                <div className="relative z-10 w-full max-w-md animate-fadeIn">
                    <div className="text-4xl mb-4">🔥</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                        INSULT AS MUCH AS YOU CAN.
                        <br />
                        <span className="text-red-500">NO LIMITS.</span>
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-8">
                        Everyone can see your messages. Be creative. Be brutal.
                    </p>

                    <button
                        onClick={handleEnterChat}
                        className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white font-black py-5 hover:from-red-600 hover:to-red-500 transition-all uppercase text-lg tracking-wide border border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                        LET ME INSULT, GODDAMN! 🤬
                    </button>

                    <p className="mt-6 text-xs text-zinc-700 font-mono">
                        WELCOME, <span className="text-red-500">{username.toUpperCase()}</span>
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-4 text-[10px] text-zinc-800 font-mono uppercase tracking-widest px-4 text-center">
                THIS IS A SAFE SPACE FOR HATE. WE DON'T GIVE A FUCK.
            </div>
        </div>
    );
};

export default Login;
