import OpenAI from "openai";
import { useState } from "react";

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
  const [history, setHistory] = useState<HistoryItem[]>([
    { role: "system", content: "behave like billy butcher from the boys" },
  ]);
  const [error, setError] = useState<string>();
  const [response, setResponse] = useState<string>("");
  const [model, setModel] = useState<Model>("gpt-3.5-turbo");

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

      for await (const chunk of completion) {
        if (chunk.choices[0].finish_reason !== "stop") {
          newResponse = newResponse + chunk.choices[0].delta.content;
          const updatedHistory = [...history];
          updatedHistory[updatedHistory.length - 1].content = newResponse;
          setHistory(updatedHistory);
        }
      }

      // setHistory([
      //   ...updatedHistory,
      //   { role: "assistant", content: newResponse },
      // ]);
    } catch (error) {
      setError(error.message);
    }
  }

  return { setModel, sendPrompt, response, history, error };
};

export default useChatStream;
