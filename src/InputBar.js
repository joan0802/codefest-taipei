// InputBar.js
import React from 'react';

export default function InputBar({ inputMessage, setInputMessage, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="input-bar">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="請輸入您的育兒問題..."
        className="input-text"
        disabled={isLoading} // 當isLoading為true時禁用輸入框
      />
      <button type="submit" className="send-button" disabled={isLoading}>
        {isLoading ? '處理中...' : '送出'}
      </button>
    </form>
  );
}
