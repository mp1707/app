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

const useChat = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { role: "system", content: "behave like billy butcher from the boys" },
  ]);
  const [error, setError] = useState<Error>();

  const sendPrompt = async (prompt: string) => {
    const answer = await openai.chat.completions
      .create({
        messages: [...history, { role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      })
      .then((res) => {
        return res.choices[0].message.content;
      })
      .catch((error) => {
        setError(error);
        return undefined;
      });

    if (answer) {
      const updatedHistory: HistoryItem[] = [
        ...history,
        { role: "user", content: prompt },
        { role: "assistant", content: answer },
      ];

      setHistory(updatedHistory);
      return answer;
    }
  };

  return { history, error, sendPrompt };
};

export default useChat;
