import React, { useEffect, useRef, useState } from "react";
import useChatStream from "../useChatStream";
import { themeChange } from "theme-change";
import ChatBubble from "./ChatBubble";
import InputForm from "./InputForm";
import { themes } from "./themes";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const { response, error, sendPrompt, history, setModel, resetHistory } =
    useChatStream();
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

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="flex justify-center items-center gap-3 h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-2 h-full w-screen md:w-5/6 lg:w-3/5 bg-base-200 px-10 py-5">
        {error && <div className="alert alert-error w-11/12">{error}</div>}
        <div className="flex items-center justify-between gap-5 w-full">
          <span className="text-xl font-bold text-center">myGPT 🦾</span>
          <select data-choose-theme className="select select-bordered">
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div
          className="w-full flex flex-col auto-overflow overflow-x-hidden no-scrollbar"
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
        />
      </div>
    </div>
  );
};
export default ChatApp;
