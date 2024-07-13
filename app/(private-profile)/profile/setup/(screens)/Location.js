import React, { useState } from "react";
import axios from "axios";

export default function Location({
  index,
  final,
  goNextStep,
  goBackStep,
  onError,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);

    try {
      const regex = /^[a-zA-Z-\s]{0,32}\,?\s?[a-zA-Z-\s]{0,32}\,?\s?[a-zA-Z]{0,3}$/
      if (!regex.test(input)) {
        throw "Location format is invalid";
      }
      
      await axios.post('/api/user/setValue', {
        key: 'location',
        value: input
      })
      goNextStep();
    } catch (error) {
      const msg =
        typeof error === "string"
          ? error
          : error?.message || error?.data?.message || "Something went wrong";
      onError("warning", msg);
      //alert(error);
    } finally {
      setTimeout(() => setLoading(() => false), 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-start relative gap-y-8"
    >
      <h3 className="text-4xl">What city are you in?</h3>
      <div className="flex items-center justify-center content-start flex-nowrap self-center">
        <label
          htmlFor="city"
          className="text-3xl font-extralight hidden md:block"
        >
          I live in
        </label>
        <input
          type="text"
          id="city"
          maxLength={20}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`focus-visible:outline-none bg-transparent ms-2
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
        I live in{input ? ` ${input}` : "..."}
      </span>

      <p className="text-base-800 text-sm italic self-end">
        This will display on your profile
      </p>

      {index ? (
        <button
          type="button"
          className="whitespace-nowrap w-min px-10 py-3 button button-outline-primary absolute bottom-4 left-4 "
          onClick={goBackStep}
        >
          👈️ Back
        </button>
      ) : null}
      <button
        type="submit"
        className={`whitespace-nowrap w-min px-10 py-3 absolute bottom-4 right-4
        button ${final ? "button-outline-success" : "button-outline-primary"}`}
      >
        {final ? "Submit 👍️" : "Next 👉️"}
      </button>
    </form>
  );
}
