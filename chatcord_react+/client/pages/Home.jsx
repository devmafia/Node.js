import { useState, useEffect } from 'react';

const Home = ({ onLogin }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users', { credentials: 'include' });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setErrorMessage('Failed to load users. Please try again.');
            }
        };

        fetchUsers();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!username.trim()) {
            setErrorMessage('Please enter a username.');
            return;
        }

        try {
            const createUserResponse = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, nickname }),
                credentials: 'include',
            });

            if (!createUserResponse.ok) {
                const errorData = await createUserResponse.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            const userData = await createUserResponse.json();

            // If a user is selected, create a chat
            if (selectedUser) {
                const createChatResponse = await fetch('http://localhost:3000/api/chats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user1Id: userData.id,
                        user2Id: selectedUser,
                    }),
                    credentials: 'include',
                });

                if (!createChatResponse.ok) {
                    throw new Error('Failed to create chat');
                }
            }

            onLogin();

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    }
    
    return (
        <div className="join-container">
            <header className="join-header">
                <h1><i className="fas fa-smile"></i> ChatCord</h1>
            </header>
            <main className="join-main">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username..."
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="nickname">Nickname (Optional)</label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            placeholder="Enter nickname..."
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="selectedUser">Select User to Chat With (Optional)</label>
                        <select 
                            name="selectedUser" 
                            id="selectedUser"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {users.filter(user => user.username !== username).map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn">Join Chat</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </form>
            </main>
        </div>
    );
}

export default Home;
