import React, { useContext, useState } from "react";
import axios from "axios";

import { AlertContext } from "@/components/AlertContext";

export default function TimeInSales({
  index,
  final,
  goNextStep,
  goBackStep,
  user,
}) {
  const { showAlert } = useContext(AlertContext);
  const [input, setInput] = useState(
    user?.firstSalesYear || new Date().getFullYear()
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => true);

    try {
      const year = parseInt(input);
      if (typeof year !== "number") {
        throw "Please enter a number.";
      }
      if (year < 1920) {
        throw "Please choose a more recent year.";
      }
      await axios.post("/api/user/setValue", {
        key: "firstSalesYear",
        value: parseInt(input),
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
  const years = new Date().getFullYear() - parseInt(input) || 1;
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-center relative gap-y-16"
    >
      <div className="max-w-[800px] w-full flex-1 flex flex-col justify-center items-center gap-8">
        <h3 className="text-3xl self-start">
          Lastly, what year did you start in sales?
        </h3>
        <div className="flex items-center justify-center content-start flex-nowrap self-center">
          <label
            htmlFor="year"
            className="text-xl md:text-3xl font-extralight "
          >
            I started my sales career in
          </label>
          <input
            type="number"
            min="1920"
            max={new Date().getFullYear()}
            id="year"
            maxLength={4}
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
            className={`focus-visible:outline-none bg-transparent
          border-b border-primary-800 
          font-normal text-primary-800 text-2xl md:text-3xl w-24 ms-2`}
            placeholder="2020"
          />
          <span className="h-10 w-10">
            <span
              className={`loading loading-dots loading-lg text-primary transition-all duration-300 ${
                !loading ? "opacity-0" : ""
              }`}
            />
          </span>
        </div>

        <p className="text-base-800 text-sm italic self-end">
          Your profile will show you've been in sales for{" "}
          {parseInt(input) > 1950 ? years : "some"} year{years > 2 && "s"}.
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
