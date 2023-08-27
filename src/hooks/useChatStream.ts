import OpenAI from "openai";
import { useState } from "react";
import useLocalState from "./useLocalState";

const openai = new OpenAI({
  // @ts-ignore
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type HistoryItem = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Model = "gpt-3.5-turbo" | "gpt-4";

const useChatStream = () => {
  const [history, setHistory] = useLocalState<HistoryItem[]>("chatHistory",[
    {
      role: "system",
      content: "You are a helpful ai assistant. Answer always using Markdown to make your answers more readable. Use breaks, bold headlines and bulletpoints to make your answers easily readable.",
    },
  ]);
  const [error, setError] = useState<string>();

  const [response, setResponse] = useState<string>("");
  const [model, setModel] = useLocalState<Model>("chatModel","gpt-3.5-turbo");

  const resetHistory = () => {
    setHistory([
      {
        role: "system",
        content: "you are a helpful ai assistant. Answer using Markdown.",
      },
    ]);
  };

  async function sendPrompt(prompt: string) {
    let updatedHistory: HistoryItem[] = [
      ...history,
      { role: "user", content: prompt },
    ];
    setHistory(updatedHistory);

    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [...history, { role: "user", content: prompt }],
        stream: true,
      });

      let newResponse = "";

      updatedHistory = [...updatedHistory, { role: "assistant", content: "" }];

      for await (const chunk of completion) {
        if (chunk.choices[0].finish_reason !== "stop") {
          newResponse = newResponse + chunk.choices[0].delta.content;
          updatedHistory[updatedHistory.length - 1].content = newResponse;
          setHistory(updatedHistory);
          setResponse(newResponse);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return { setModel, sendPrompt, response, history, error, resetHistory, model };
};

export default useChatStream;
