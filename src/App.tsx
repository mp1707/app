import { useEffect, useRef, useState } from "react";
import "./App.css";
import React from "react";

import useChatStream, { Model } from "./useChatStream";

function App() {
  const [prompt, setInput] = useState("");
  const [answer, setAnswer] = useState<string | undefined>("");
  const { response, error, sendPrompt, history, setModel } = useChatStream();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPrompt(prompt);
    setInput(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [history[history.length - 1].content]);

  useEffect(() => {
    console.log(history);
  }, [history]);

  return (
    <div className="flex flex-col justify-center  items- gap-3 h-screen w-screen p-10">
      {error && <div className="alert alert-error w-11/12">{error}</div>}
      <span className="text-xl font-bold text-center">GPTiramisu</span>
      <div
        className="w-full flex flex-col auto-overflow overflow-x-hidden no-scrollbar"
        ref={chatContainerRef}
      >
        {history.map(
          (h) =>
            h.role !== "system" && (
              <div
                className={
                  "flex flex-col gap-2 w-full " +
                  (h.role === "user"
                    ? "chat chat-end text-right"
                    : "chat chat-start")
                }
                key={h.content}
              >
                <div className="font-bold w-1/2 mx-2">{h.role}</div>
                <div
                  className={
                    "chat-bubble w-1/2 " +
                    (h.role === "user" ? "chat-bubble-success" : "")
                  }
                >
                  {h.content}
                </div>
              </div>
            )
        )}
        {response && <div className="chat-bubble w-1/2 hidden">{response}</div>}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-3/4">
        <div>{/* asdasd */}</div>
        <div className="flex gap-2 w-full">
          <input
            value={prompt}
            onChange={handleInputChange}
            type="text"
            placeholder="Whats questiooon?"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={handleSubmit}>
            Ask
          </button>
          <select
            className="select select-bordered max-w-xs"
            onChange={(e) => setModel(e.target.value as Model)}
          >
            <option value="gpt-3.5-turbo">GPT 3.5</option>
            <option value="gpt-4">GPT 4</option>
          </select>
        </div>
        {/* <span className="">{response}</span> */}
      </div>
      {/* DEBUG: History
      <span className="w-1/2">
        {history.map((h) => (
          <div className="flex flex-col gap-2" key={h.content}>
            <div className="text-lg font-bold ">{h.role}</div>
            <div>{h.content}</div>
          </div>
        ))}
      </span> */}
    </div>
  );
}

export default App;
