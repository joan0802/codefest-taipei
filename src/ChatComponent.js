import React, { useState } from 'react';
import OpenAI from 'openai';  // 確保使用正確版本的 openai 套件

const ChatComponent = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: '你是一位育兒專家，請用繁體中文提供專業的建議，幫助家長解答育兒問題，涵蓋如兒童照顧、行為管理和早期教育等範疇。' },
        { role: 'assistant', content: '您好，我是您的育兒專家，請隨時提問有關育兒的任何問題，我會竭誠為您提供幫助。' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    // 初始化 OpenAI 配置
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,  // 請確保從環境變數讀取 API 金鑰
        dangerouslyAllowBrowser: true,  // 允許在瀏覽器中使用 OpenAI API
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = { role: 'user', content: inputMessage };
        setMessages([...messages, userMessage]);

        try {
            const recentMessages = messages.slice(-5);  // 只傳遞最近 5 條訊息，減少傳遞的上下文
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',  // 使用 GPT-4 進行回應生成
                messages: [...recentMessages, userMessage],
                temperature: 0.2,  // 降低隨機性，加快回應生成
                max_tokens: 100,  // 限制回應的長度，加快回應速度
            });

            const aiMessage = response.choices[0].message;
            setMessages([...messages, userMessage, aiMessage]);
        } catch (error) {
            console.error('Error with API request:', error);
        }

        setInputMessage('');
    };

    return (
        <div>
            <div className="chatbox">
                {messages
                    .filter(msg => msg.role !== 'system')  // 過濾掉系統訊息
                    .map((msg, index) => (
                        <div key={index} className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
                            <strong>{msg.role === 'user' ? '你: ' : '專家: '}</strong>
                            {msg.content}
                        </div>
                    ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="請輸入您的育兒問題..."
                />
                <button type="submit">送出</button>
            </form>
        </div>
    );
};

export default ChatComponent;
