import React, { useState } from "react";
import axios from "axios";

export default function CurrentEmployement({
  index,
  final,
  goNextStep,
  goBackStep,
  onError,
  user,
}) {
  const [role, setRole] = useState(user?.role || "");
  const [company, setCompany] = useState(user?.company || "");
  const [loading, setLoading] = useState(false);
  const [employed, setEmployed] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employed === null) {
        throw "Please make a selection";
      }
      if (employed) {
        setLoading(() => true);
        if (!company || !role) {
          throw "Please fill in your details";
        }
        await axios.post("/api/user/setValue", {
          key: "role",
          value: role,
        });

        await axios.post("/api/user/setValue", {
          key: "company",
          value: company,
        });
      }
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
      flex flex-col justify-center items-center relative gap-y-16 pb-8"
    >
      <div className="max-w-[800px] w-full flex flex-col justify-center items-center gap-8">
        <h3 className="text-3xl self-start">Are you currently employeed?</h3>
        <div className="w-full flex justify-center items-center gap-8 flex-col md:flex-row">
          <button
            type="button"
            className={`btn btn-success text-base-light px-10 py-2 min-w-52 ${
              employed === true ? "" : "scale-[0.85] btn-outline"
            }`}
            onClick={() => setEmployed(true)}
          >
            Yes I am!
          </button>
          <button
            type="button"
            className={`btn btn-warning text-base-light px-10 py-2 min-w-52 ${
              employed === false ? "" : "scale-[0.85] btn-outline"
            }`}
            onClick={() => setEmployed(false)}
          >
            Not at the moment
          </button>
        </div>

        <p className="text-3xl min-h-10 font-light">
          {employed === true && "Awesome, where are you working right now? 🏢"}
          {employed === false &&
            "Not a problem, let's show off your skills! 💪"}
        </p>
        <div
          className={`w-min-content flex flex-col items-start gap-4 
            transition-all duration-500 
        ${!employed ? "opacity-30" : "opacity-100"}`}
        >
          <div className="flex items-center justify-center content-start flex-nowrap">
            <label
              htmlFor="year"
              className="text-3xl font-extralight hidden md:block"
            >
              I'm a
            </label>
            <input
              type="text"
              id="title"
              maxLength={64}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`focus-visible:outline-none bg-transparent
                border-b border-primary-800 
                font-normal text-primary-800 text-3xl w-80 ms-2`}
              placeholder="Sales Development Rep"
              disabled={!employed}
            />
          </div>

          <div className="flex items-center justify-center content-start flex-nowrap">
            <label
              htmlFor="year"
              className="text-3xl font-extralight hidden md:block"
            >
              working at
            </label>
            <input
              type="text"
              id="company"
              maxLength={128}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`focus-visible:outline-none bg-transparent
                border-b border-primary-800 
                font-normal text-primary-800 text-3xl w-80 ms-2`}
              placeholder="Google"
              disabled={!employed}
            />
            <span className="h-10 w-10">
              <span
                className={`loading loading-dots loading-lg text-primary transition-all duration-300 ${
                  !loading ? "opacity-0" : ""
                }`}
              />
            </span>
          </div>
        </div>
      </div>
      {index ? (
        <button
          type="button"
          className="whitespace-nowrap btn btn-outline btn-primary absolute bottom-4 left-4 "
          onClick={goBackStep}
        >
          👈️ Back
        </button>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className={`whitespace-nowrap w-min px-10 py-2 absolute bottom-2 right-2
        btn btn-outline ${final ? "btn-success" : "btn-primary"}
        md:bottom-4 md:right-4`}
      >
        {final ? "Submit 👍️" : "Next 👉️"}
      </button>
    </form>
  );
}
