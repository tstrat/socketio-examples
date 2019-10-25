import React from 'react';
import io from 'socket.io-client';
import Socket from './Socket';
let socket = io.connect('http://localhost:4000');

function App() {
    return (
        <div className='App'>
            <Socket socket={socket} />
        </div>
    );
}

export default App;
