import React, { useContext, useState } from "react";
import axios from "axios";

import MonthYearPicker from "@/components/MonthYearPicker";
import { AlertContext } from "@/components/AlertContext";

export default function WorkHistory({
  index,
  final,
  goNextStep,
  goBackStep,
  user
}) {
  const { showAlert } = useContext(AlertContext)
  const [inputs, setInputs] = useState(
    user?.workHistory || [{ company: "", start: "", end: "" }]
  );
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
      showAlert("warning", msg);
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

  const setStartDate = (e, i) => {
    e.preventDefault();
    const text = e.target.value;
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], start: text };
      return updatedInputs;
    });
  };

  const setEndDate = (e, i) => {
    e.preventDefault();
    const text = e.target.value;
    setInputs((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], end: text };
      return updatedInputs;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-start items-center relative"
    >
      <div className="max-w-[800px] w-full flex-1 flex flex-col justify-center items-center gap-8">
        <h3 className="text-3xl self-start">Where have you worked?</h3>
        <ol className="list-none flex flex-col gap-y-8 w-full">
          {inputs.map((input, i) => (
            <li
              key={i}
              className={`flex flex-col max-w-full gap-4
               items-start justify-center self-center ${
                 input.company ? "opacity-100" : "opacity-100"
               }`}
            >
              <div className="max-w-full">
                <label
                  htmlFor="company"
                  className="text-xl md:text-3xl font-extralight"
                >
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
                  font-normal text-primary-800 text-xl md:text-3xl min-w-52 text-start`}
                  placeholder={["Microsoft", "Google", "Amazon"][i]}
                />
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xl md:text-3xl font-extralight">
                  from
                </span>

                <MonthYearPicker
                  className="text-xs px-1 md:px-3 md:text-xl h-8 md:h-10 w-32 md:w-52"
                  value={input.start || null}
                  onChange={(e) => setStartDate(e, i)}
                />
                <span className="text-xl md:text-3xl font-extralight">to</span>
                <MonthYearPicker
                  className="text-xs px-1 md:px-3 md:text-xl h-8 md:h-10 w-32 md:w-52"
                  value={input.end || null}
                  onChange={(v) => setEndDate(v, i)}
                />
              </div>
            </li>
          ))}
        </ol>
        <button
          className="btn btn-accent self-end"
          type="button"
          onClick={() =>
            setInputs([...inputs, { company: "", start: "", end: "" }])
          }
          disabled={inputs.length >= 3}
        >
          {inputs.length < 3 ? "Add Role ➕" : "That looks good! ✔️"}
        </button>
      </div>
      <p className="text-base-800 text-sm italic self-end">
        This will display on your profile
      </p>

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
