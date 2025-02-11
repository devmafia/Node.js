
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Chat = ({ onLogout }) => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const socket = useRef();
    const chatMessagesRef = useRef();

    useEffect(() => {
        socket.current = io('http://localhost:3000', { withCredentials: true });

        const fetchChats = async () => {
            try {
                const userResponse = await fetch('http://localhost:3000/api/current-user', { credentials: 'include' });
                if (!userResponse.ok) {
                    throw new Error('Failed to get current user');
                }
                const userData = await userResponse.json();
                const userId = userData.userId;

                const response = await fetch(`http://localhost:3000/api/chats/${userId}`, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error('Failed to fetch chats');
                }
                const data = await response.json();
                setChats(data);
                if (data.length > 0) {
                    setCurrentChat(data[0]);
                    fetchMessagesForChat(data[0].id);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users', { credentials: 'include' });
                const data = await response.json();
                const userResponse = await fetch('http://localhost:3000/api/current-user', { credentials: 'include' });
                const userData = await userResponse.json();
                setUsers(data.filter(user => user.id !== userData.userId));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchChats();
        fetchUsers();

        return () => {
            socket.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentChat) {
            socket.current.emit('joinChat', { chatId: currentChat.id });

            const handleChatHistory = (history) => {
                setMessages(history);
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            };
    
            const handleNewMessage = (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            };
    
            socket.current.on("chatHistory", handleChatHistory);
            socket.current.on("message", handleNewMessage);
    
            return () => {
                socket.current.off("chatHistory", handleChatHistory);
                socket.current.off("message", handleNewMessage);
            };
        }
    }, [currentChat]);

    const fetchMessagesForChat = async (chatId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/messages/${chatId}`, { credentials: 'include' });
            const data = await response.json();
            setMessages(data);

            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    function handleSendMessage(e) {
        e.preventDefault();
        const content = e.target.elements.msg.value.trim();
        if (!content || !currentChat) return;

        socket.current.emit('chatMessage', {
            chatId: currentChat.id,
            content
        });

        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    }

    async function handleStartNewChat() {
        if (!selectedUser) return;
    
        try {
            const response = await fetch('http://localhost:3000/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user2Id: selectedUser,
                }),
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error('Failed to create chat');
            }
    
            const chat = await response.json();
    
            // Fetch user data for the newly created chat
            const user1Response = await fetch(`http://localhost:3000/api/users/${chat.user1Id}`, { credentials: 'include' });
            const user1 = await user1Response.json();
    
            const user2Response = await fetch(`http://localhost:3000/api/users/${chat.user2Id}`, { credentials: 'include' });
            const user2 = await user2Response.json();
    
            const updatedChat = {
                ...chat,
                user1,
                user2,
            };
    
            setChats(prevChats => [...prevChats, updatedChat]);
            setCurrentChat(updatedChat);
            fetchMessagesForChat(updatedChat.id);
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    }

    function handleChatSelection(chat) {
        setCurrentChat(chat);
        fetchMessagesForChat(chat.id);
    }

    function handleLeave() {
        onLogout()
    }

    return (
        <div>
            <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> ChatCord</h1>
                    <button onClick={handleLeave} className="btn">Leave Chat</button>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3><i className="fas fa-comments"></i> Your Chats</h3>
                        {chats.length > 0 ? (
                            <ul id="chats">
                                {chats.map((chat) => (
                                    <li 
                                        key={chat.id} 
                                        onClick={() => handleChatSelection(chat)}
                                        className={chat.id === currentChat?.id ? 'active' : ''}
                                    >
                                    {chat.user1Id === localStorage.getItem('userId') 
                                        ? (chat.user2?.username || "Loading...") 
                                        : (chat.user1?.username || "Loading...")}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No chats yet. Start a new one!</p>
                        )}
                        <h3><i className="fas fa-users"></i> Start New Chat</h3>
                        <select className="btn"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option className="btn" value="">Select a user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                        <button onClick={handleStartNewChat} className="btn">Start Chat</button>
                    </div>
                    <div ref={chatMessagesRef} className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            <p className="meta">
                                {message.user ? message.user.username : "Unknown User"} 
                                <span>{new Date(message.createdAt).toLocaleString()}</span>
                            </p>
                            <p className="text">{message.content}</p>
                        </div>
                    ))}
                    </div>
                </main>
                <div className="chat-form-container">
                    <form onSubmit={handleSendMessage} id="chat-form">
                        <input
                            id="msg"
                            type="text"
                            placeholder="Enter Message"
                            required
                            autoComplete="off"
                        />
                        <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat;
