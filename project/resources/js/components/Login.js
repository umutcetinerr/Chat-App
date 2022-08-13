import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import io from 'socket.io-client';
import Users from './Users';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const socket = io.connect("http://localhost:3001");

function Login() {
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState(false);


    const send = () => {
        if (username != "") {
            socket.emit('login', username, (gelen) => {
                console.log(gelen);
                if (gelen == false) {
                    alert('kullanıcı var');
                } else {
                    setSuccess(gelen);
                };
            });

        } else { alert("Kullanıcı adı girmeniz gerekiyor.") }
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
                        onKeyPress={(event) => {
                            event.key === "Enter" && send();
                        }}
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
            <div className='row' style={{ marginBottom: '30px' }}>
                    <div className='row'>
                    <Navbar bg="dark" variant="dark">
                        <Container style={{ marginLeft: '10px' }}>
                            <Navbar.Brand  >

                            <h3>  Kullanıcı Adınız:&nbsp; {username} </h3>
                            </Navbar.Brand>
                        </Container>
                        <button type='submit' className='btn btn-outline-info' style={{ marginRight: '10px' ,paddingLeft: '30px', paddingRight: '30px', paddingBottom: '15px', paddingTop: '15px' }}>Çıkış</button>
                    </Navbar>
                    </div>
                </div>
            <div className='row'>
                
                <div className='col-md-6' >
                    <Chat socket={socket} username={username} />
                </div>
                <div className='col-md-6'>
                    <Users socket={socket} />
                </div>
            </div>
            </>
        )
    }
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}