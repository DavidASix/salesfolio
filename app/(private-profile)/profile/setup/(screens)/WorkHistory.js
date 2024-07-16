import React, { useState } from "react";
import axios from "axios";

export default function WorkHistory({
  index,
  final,
  goNextStep,
  goBackStep,
  onError,
}) {
  const [inputs, setInputs] = useState([{ company: "", years: "" }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);

    try {
      await axios.post("/api/user/setValue", {
        key: "workHistory",
        value: inputs,
      });
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

  const setCompany = (text, i) => {
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], company: text };
      return updatedInputs;
    });
  };

  const setYear = (text, i) => {
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], years: text };
      return updatedInputs;
    });
  };

  const moveUp = (i) => {
    const replacing = inputs[i - 1];
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i - 1] = updatedInputs[i];
      updatedInputs[i] = replacing;
      return updatedInputs;
    });
  };

  const moveDown = (i) => {
    const replacing = inputs[i + 1];
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i + 1] = updatedInputs[i];
      updatedInputs[i] = replacing;
      return updatedInputs;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-center relative gap-y-16 pb-8"
    >
      <div className="max-w-[800px] w-full flex flex-col justify-center items-center gap-8">
      <div className="self-start">
        <h3 className="text-4xl">Where have you worked?</h3>
        <p className="text-lg font-extralight max-w-[600px]">
          Entering some of your relevant work history gives employeers an idea
          of what you've been up to. This doesn't have to be detailed, just a
          company and your years of tenure, rounded up!
        </p>
      </div>
      <ol className="list-none">
        {inputs.map((input, i) => (
          <li
            key={i}
            className="flex items-center justify-center content-start flex-wrap self-center"
          >
            <div>
              <label htmlFor="company" className="text-3xl font-extralight">
                I worked at
              </label>
              <input
                type="text"
                id="company"
                maxLength={20}
                value={input.company}
                onChange={(e) => setCompany(e.target.value, i)}
                className={`focus-visible:outline-none bg-transparent ms-2
                  border-b border-primary-800 
                  font-normal text-primary-800 text-3xl min-w-52 text-center`}
                placeholder="Microsoft"
              />
            </div>
            <div>
              <label htmlFor="years" className="text-3xl font-extralight">
                for
              </label>
              <input
                type="number"
                id="years"
                maxLength={20}
                value={input.years}
                onChange={(e) => setYear(e.target.value, i)}
                className={`focus-visible:outline-none bg-transparent ms-2
                  border-b border-primary-800 
                  font-normal text-primary-800 text-3xl w-28 text-center`}
                placeholder="2"
              />
              <span className="text-3xl font-extralight">years.</span>
            </div>
            <div>
              <button
                className="text-xl w-10 h-10 bg-accent disabled:bg-accent-300 rounded-xl mx-2"
                disabled={i === 0}
                type="button"
                onClick={() => moveUp(i)}
              >
                👆️
              </button>
              <button
                className="text-xl w-10 h-10 bg-accent disabled:bg-accent-300 rounded-xl"
                disabled={i === inputs.length - 1}
                type="button"
                onClick={() => moveDown(i)}
              >
                👇️
              </button>
            </div>
          </li>
        ))}
      </ol>
      </div>
      <button
        className="button button-outline-accent px-10 py-3 self-end"
        type="button"
        onClick={() => setInputs([...inputs, { company: "", years: "" }])}
        disabled={inputs.length >= 3}
      >
        {inputs.length < 3 ? "Add Role ➕" : "That looks good! ✔️"}
      </button>
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
