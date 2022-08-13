import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username }) {
  const [messages, setMessages] = useState("");
  const [messageShow, setMessageShow] = useState([]);
  
  const sendMessage = async () => {
    if (messages !== "") {
      const messageData = {
        author: username,
        message: messages,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      // Burası aktif olunca mesaj yazan kişinin ekranında 2 kere görünüyor
      //setMessageShow((list) =>[...list,messageData]);
    };
  };

  useEffect(() => {
    socket.on("take_message", (data) => {
      setMessageShow((list) => [...list, data]);
      setMessages("");
    });
  }, []);

  return (
    <div className="chat-window" style={{ marginLeft: '20px' }}>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>

      <div className='chat-body'>
        <ScrollToBottom className='message-container'>

          {messageShow.map((messageContent, i) => {
            return (
              <div className="message" key={i}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );

          })}

        </ScrollToBottom>
      </div>

      <div className='chat-footer'>
        <input type="text"
          value={messages}
          className='form-control'
          placeholder='Mesajınızı buraya yazabilirsiniz'
          onChange={(event) => {
            setMessages(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button type='submit' onClick={sendMessage} >&#9658;</button>
      </div>




    </div>


  );

}

export default Chat;

