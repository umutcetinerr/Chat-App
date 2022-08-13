import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Users({ socket }) {
    const [users, setUsers] = useState([]);
    const [who, setWho] = useState();
    // {id: socket.id, newUserName: username}
    useEffect(() => {
        socket.on("take_users", (kullanicilar) => {
            setUsers(Object.values(kullanicilar));
            setWho(kullanicilar[socket.id]);
        });
    }, []);
    return (
        <div className="chat-window" style={{float: 'right',marginRight: '20px'}}>
          <div className='chat-header'>
            <p style={{ paddingLeft: '125px ' }}>USERS</p>
          </div>
          <div className='chat-body'>
            <ScrollToBottom className='message-container'>
              {users.map((user, i) => (
                <div className="message" key={i}>
                  <div className='message-content'>
                    <p>{user}</p>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </div>
        </div>
    );
}

export default Users;

