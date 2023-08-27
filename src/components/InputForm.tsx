import React from "react";
import { Model } from "../useChatStream";

type InputFormProps = {
  handleReset: (e: any) => void;
  handleSubmit: (e: any) => void;
  handleInputChange: (e: any) => void;
  input: string;
  selectBox: (m: Model) => void;
};

export default function InputForm({
  handleReset,
  handleSubmit,
  handleInputChange,
  input,
  selectBox,
}: InputFormProps) {
  return (
    <div className="flex gap-2 items-end w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap md:flex-nowrap gap-2 w-full"
      >
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder="type here 👇🏼"
          className="input input-bordered w-full md:max-w-xl"
        />
        <select
          className="select select-bordered max-w-xs"
          onChange={(e) => selectBox(e.target.value as Model)}
        >
          <option value="gpt-3.5-turbo">🚀 fast (3.5)</option>
          <option value="gpt-4">🧠 smart (4)</option>
        </select>
        <button className="btn btn-neutral" type="reset" onClick={handleReset}>
          new
        </button>
        <input className="btn btn-accent flex-1" type="submit" value="go" />
      </form>
    </div>
  );
}
