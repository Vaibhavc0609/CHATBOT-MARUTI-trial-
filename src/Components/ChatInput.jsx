import { useState } from 'react';

const CHIPS = ['SUV under 10 lakh', 'Best CNG cars', 'Swift vs Dzire', 'Hybrid cars', '7 seater'];

function ChatInput({ onSend, isTyping }) {
  const [inputText, setInputText] = useState('');

  function submit(text) {
    if (!text.trim() || isTyping) return;
    onSend(text);
    setInputText('');
  }

  return (
    <form
      className="chat-input-container"
      onSubmit={(event) => {
        event.preventDefault();
        submit(inputText);
      }}
    >
      <div className="chat-chips">
        {CHIPS.map((c) => (
          <button type="button" key={c} onClick={() => submit(c)}>{c}</button>
        ))}
      </div>
      <input
        placeholder="Ask about any Maruti Suzuki car"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        className="chat-input"
      />
      <button type="submit" className="send-button" disabled={isTyping}>Send</button>
    </form>
  );
}

export default ChatInput;
