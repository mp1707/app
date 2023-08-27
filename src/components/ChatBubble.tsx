import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type ChatBubbleProps = {
  role: "assistant" | "user";
  content: string;
};

const ChatBubble = ({ role, content }: ChatBubbleProps) => {
  return (
    <div
      className={
        "flex flex-col gap-2 w-full" +
        (role === "user" ? "chat chat-end text-right" : "chat chat-start")
      }
    >
      <div className="font-bold w-1/2 mx-2 text-neutral">{role}</div>
      <ReactMarkdown
        className={
          "chat-bubble " + (role === "user" ? "chat-bubble-primary" : "")
        }
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
export default ChatBubble;
