import React, { useEffect, useRef, useState } from "react";
import useChatStream from "../hooks/useChatStream";
import ChatBubble from "../components/ChatBubble";
import InputForm from "../components/InputForm";
import LayoutContainer from "../components/LayoutContainer";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const {
    response,
    error,
    sendPrompt,
    history,
    setModel,
    resetHistory,
    model,
  } = useChatStream();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      sendPrompt(input);
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetHistory();
  };

  // scroll effekt
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [history[history.length - 1].content]);
  return (
    <LayoutContainer>
      <div className="flex flex-col justify-center items-center gap-2 p-5 w-full bg-base-200 rounded-md">
        {error && <div className="alert alert-error w-11/12">{error}</div>}
        <div className="flex items-center justify-between gap-5 w-full">
          <span className="text-xl font-bold text-center">myGPT 🦾</span>
        </div>
        <div
          className="w-full flex flex-col auto-overflow overflow-x-hidden no-scrollbar p-2"
          ref={chatContainerRef}
        >
          {history.map(
            (h, i) =>
              h.role !== "system" && (
                <ChatBubble
                  key={h.content + i}
                  role={h.role}
                  content={h.content}
                />
              )
          )}
          {response && (
            <div className="chat-bubble w-1/2 hidden">{response}</div>
          )}
        </div>
        <InputForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          input={input}
          selectBox={setModel}
          model={model}
        />
      </div>
    </LayoutContainer>
  );
};
export default ChatApp;
