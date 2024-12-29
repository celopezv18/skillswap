import { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage } from '../api';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import notificationSound from './message.mp3';
import './Chat.css';

const Chat = () => {
  const location = useLocation();
  const { matchId } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('idu');
  const socketRef = useRef(null);
  const audioRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref for messages container

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.preload = 'auto';
  }, []);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server:', socketRef.current.id);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setError('Error connecting to chat server');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!matchId) {
      window.history.go(-1);
      return;
    }

    const loadMessages = async () => {
      try {
        const response = await getMessages(matchId, userId);
        const transformedMessages = response.map((msg) => ({
          ...msg,
          isCurrentUser: msg.sender_id === parseInt(userId),
        }));
        setMessages(transformedMessages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Error loading messages');
        setLoading(false);
      }
    };

    loadMessages();

    if (socketRef.current) {
      socketRef.current.on('message', (message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...message,
            isCurrentUser: message.sender_id === parseInt(userId),
          },
        ]);

        // Play sound if window is not focused
        if (!document.hasFocus() && audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.log('Error playing sound:', err);
          });
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message');
      }
    };
  }, [matchId, userId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageHandler = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await sendMessage(matchId, newMessage);
      const newMsg = {
        ...response,
        isCurrentUser: true, // Always true for messages we send
      };

      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage('');

      if (socketRef.current) {
        socketRef.current.emit('sendMessage', newMsg);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error sending message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageHandler();
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <div className="d-flex align-items-center gap-3">
            <div>
              <h5 className="mb-0">Chat</h5>
              <small className="text-muted">Online</small>
            </div>
          </div>
        </div>

        <div
          className="messages-container"
          ref={messagesContainerRef} // Attach ref here
        >
          <div className="message-list">
            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-bubble ${
                    message.isCurrentUser ? 'message-outgoing' : 'message-incoming'
                  }`}
                >
                  <div className="message-sender">
                    {message.senderName || 'Unknown'}
                  </div>
                  <div className="message-content">{message.content}</div>
                </div>
              ))
            ) : (
              <div className="no-messages">
                <div className="text-center text-muted mt-4">
                  <i className="bi bi-chat-dots fs-1"></i>
                  <p className="mt-2">No messages yet</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="alert alert-danger mx-3" role="alert">
            {error}
          </div>
        )}

        <div className="chat-input">
          <form onSubmit={handleSubmit} className="d-flex gap-2">
            <div className="input-group">
              <textarea
                className="form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows="1"
              />
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;