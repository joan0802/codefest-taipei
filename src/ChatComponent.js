import React, { useState } from 'react';
import OpenAI from 'openai';
import MessageList from './MessageList';
import InputBar from './InputBar';

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { role: 'system', content: '你是一位育兒專家，請用繁體中文提供專業的建議，幫助家長解答育兒問題，涵蓋如兒童照顧、行為管理和早期教育等範疇，但請簡明扼要的回答。' },
    { role: 'assistant', content: '您好，我是您的育兒專家，請隨時提問有關育兒的任何問題，我會竭誠為您提供幫助。' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 用於控制是否禁用輸入框

  // OpenAI initialization
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true); // 禁用輸入框

    try {
      const recentMessages = messages.slice(-5); // Send last 5 messages as context
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [...recentMessages, userMessage],
        temperature: 0.2,
        max_tokens: 500,
      });

      const aiMessage = response.choices[0].message;
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error with API request:', error);
    }

    setIsLoading(false); // 啟用輸入框
  };

  return (
    <div className="chat-container">
      <div className='overflow-y-auto h-[74vh] mb-3'>
        <MessageList messages={messages.filter(msg => msg.role !== 'system')} />
      </div>
      <InputBar 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSubmit={handleSubmit}
        isLoading={isLoading} // 傳遞isLoading狀態
      />
    </div>
  );
}
