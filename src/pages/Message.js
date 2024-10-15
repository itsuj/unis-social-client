import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Message() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    // Fetch received messages
    axios.get('/receivedmessages')
      .then(response => {
        setReceivedMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching received messages:', error);
      });

    // Fetch sent messages
    axios.get('/sentmessages')
      .then(response => {
        setSentMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching sent messages:', error);
      });
  }, []);

  const sendMessage = () => {
    const receiverId = 123; // Replace with actual receiver's ID
    const data = {
      receiverId: receiverId,
      message: message
    };

    // Send message
    axios.post('/sendmessage', data)
      .then(response => {
        console.log('Message sent successfully:', response.data);
        // Update UI to reflect the sent message if needed
        // For simplicity, we're not updating the sent messages list here
        setMessage(''); // Clear the input field after sending the message
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div>
      <h1>Send Message</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <h2>Received Messages</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>

      <h2>Sent Messages</h2>
      <ul>
        {sentMessages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Message;

