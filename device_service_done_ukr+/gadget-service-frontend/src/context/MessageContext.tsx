// MessageContext.tsx

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

interface MessageContextType {
  messages: Message[];
  fetchMessages: (token: string) => void
  addMessage: (msg: Message) => void;
  updateMessage: (_id: string, updatedData: Omit<Message, '_id'>) => void;
  removeMessage: (_id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = useCallback(async (token: string) => {
  try {
  const messageResponse = await axios.get('http://localhost:5000/api/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Messages Response:', messageResponse.data);

   setMessages(messageResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}, []);

  const addMessage = (msg: Message) => {
    //console.log(msg)
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const updateMessage = (_id: string, updatedData: Omit<Message, '_id'>) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === _id ? { ...msg, ...updatedData } : msg
      )
    );
  };

  const removeMessage = (_id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== _id));
  };

  return (
    <MessageContext.Provider value={{ messages, fetchMessages, addMessage, updateMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
