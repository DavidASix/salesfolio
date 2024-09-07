import React, { useContext, useState } from "react";
import axios from "axios";

import { AlertContext } from "@/components/AlertContext";
import formatClientError from "@/utils/client-error";

export default function Username({
  index,
  final,
  goNextStep,
  goBackStep,
  profile,
}) {
  const { showAlert } = useContext(AlertContext);
  const [input, setInput] = useState(profile?.username || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);

    try {
      const regex = /^[a-zA-Z][a-zA-Z0-9_-]{3,29}$/g;
      if (!regex.test(input)) {
        throw "Username is invalid";
      }
      await axios.post("/api/user/setValue", { key: "username", value: input });
      goNextStep();
    } catch (error) {
      const { message } = formatClientError(error);
      showAlert("warning", message);
    } finally {
      setTimeout(() => setLoading(() => false), 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-center relative gap-y-16"
    >
      <div className="max-w-[800px] w-full flex-1 flex flex-col justify-center items-center gap-8">
        <h3 className="text-3xl self-start">Let&apost;s start with a handle</h3>
        <div className="flex items-center justify-center content-start flex-nowrap self-center">
          <label
            htmlFor="handle"
            className="text-3xl font-extralight hidden md:block"
          >
            mysalesfolio.com/p/
          </label>
          <input
            type="text"
            id="handle"
            maxLength={20}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`focus-visible:outline-none bg-transparent
              border-b border-primary-800 
              font-normal text-primary-800 text-3xl w-80`}
            placeholder="myName"
          />
          <span className="h-10 w-10">
            <span
              className={`loading loading-dots loading-lg text-primary transition-all duration-300 ${
                !loading ? "opacity-0" : ""
              }`}
            />
          </span>
        </div>
        <span className="w-full text-center -mt-8 text-sm text-base-800 md:hidden">
          mysalesfolio.com/p/{input || "username"}
        </span>

        <p className="text-base-800 text-sm italic self-end">
          People will find your folio with this
        </p>
      </div>

      <div className="w-full h-min flex justify-between p-4">
        <button
          type="button"
          className={`whitespace-nowrap w-min px-8 py-2 text-xl
            header-font btn btn-accent md:bottom-4 md:left-4`}
          onClick={goBackStep}
          disabled={!index}
        >
          👈️ Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`whitespace-nowrap w-min px-8 py-2 text-xl
        header-font btn ${final ? "btn-success" : "btn-primary"}
        md:bottom-4 md:right-4`}
        >
          {final ? "Submit 👍️" : "Next 👉️"}
        </button>
      </div>
    </form>
  );
}
