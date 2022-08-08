import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function Login() {
    const [username,setUsername] = useState('');
    const [success, setSuccess] = useState(false);

    
    const send = () => {
        if(username !=""){
        socket.emit('login', username, (gelen) => {
            console.log(gelen);
            if (gelen == false) { 
                alert('kullanıcı var');
            } else {
                setSuccess(gelen);
            };
        });
    
        }else { alert("Kullanıcı adı girmeniz gerekiyor.")}
    };

    if (success == false) {
        
        return (
            <div className="App">
            <div className="joinChatContainer">
                <input
                    className='fs-5 fw-semibold'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='username'
                />
                &nbsp;
                <button
                    type="submit"
                    onClick={send}
                >
                    Connect
                </button>
            </div>
            </div>
            
        );
    } else {
        return (
            <>
                <Chat socket={socket} username={username} />
            </>
        )
    }
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
  }