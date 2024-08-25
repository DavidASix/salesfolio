import React, { useContext, useState } from "react";
import axios from "axios";
import { AlertContext } from "@/components/AlertContext";

export default function CurrentEmployement({
  index,
  final,
  goNextStep,
  goBackStep,
  user,
}) {
  const { showAlert } = useContext(AlertContext);
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
      showAlert("warning", msg);
      //alert(error);
    } finally {
      setTimeout(() => setLoading(() => false), 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-center relative"
    >
      <div className="max-w-[800px] w-full flex-1 flex flex-col justify-center items-center gap-4 md:gap-16">
        <h3 className="text-2xl md:text-3xl self-start">
          Are you currently employed?
        </h3>

        <div className="w-full flex justify-center items-center gap-2 md:gap-4 flex-col md:flex-row">
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

        <p className="text-2xl md:text-3xl text-center min-h-10 font-light">
          {employed === true && "Awesome, where are you working right now? 🏢"}
          {employed === false && "No problem, let's hear about past jobs! 💪"}
        </p>

        <div
          className={`w-min-content max-w-full flex flex-col items-start gap-4 
            transition-all duration-500  ${
              !employed ? "opacity-30" : "opacity-100"
            }`}
        >
          <div className="flex flex-nowrap md:flex-row md:items-center md:justify-center flex-col">
            <label
              htmlFor="title"
              className="text-2xl md:text-3xl font-extralight"
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

          <div className="flex flex-nowrap md:flex-row md:items-center md:justify-center flex-col">
            <label
              htmlFor="company"
              className="text-2xl md:text-3xl font-extralight"
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
