// MessageList.js
import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <Message key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
