import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
    const [username, setUsername] = useState('');
    const [userColor, setUserColor] = useState('#dc2626');
    const [isJoined, setIsJoined] = useState(false);

    const handleJoin = (name, color) => {
        setUsername(name);
        setUserColor(color);
        setIsJoined(true);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            {!isJoined ? (
                <Login onJoin={handleJoin} />
            ) : (
                <Chat username={username} userColor={userColor} />
            )}
        </div>
    );
}

export default App;
