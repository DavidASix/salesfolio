"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { FaAngleDoubleRight } from "react-icons/fa";

import { AlertContext } from "@/components/AlertContext";
import regex from "@/utils/regex";
import OvalSeperator from "@/components/svgs/oval-seperator-thin.svg";

const faq = [
  { question: "How is this not linkedin?", answer: "Here is why" },
  {
    question: "How do you verify deals?",
    answer: "We verify deals by verifying them",
  },
  { question: "What if I don't want to share?", answer: "You don't have to" },
  {
    question: "Some other question",
    answer:
      "Pariatur ut laboris incididunt cillum cupidatat pariatur aliqua. Non sunt eu id reprehenderit. Incididunt cupidatat incididunt minim nisi. Ipsum veniam fugiat enim adipisicing nisi Lorem sunt Lorem amet exercitation officia cillum laboris voluptate. Cupidatat irure do velit est in eiusmod proident excepteur eu pariatur consequat do qui ad. Cupidatat minim Lorem aute Lorem velit mollit veniam magna irure ea consectetur.",
  },
];

export default function Home() {
  const { showAlert } = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (!regex.email.test(email)) {
        throw "Email Invalid";
      }
      await axios.post("/api/marketing/recordEmail", { email });
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      let msg = typeof err === "string" ? err : false;
      msg =
        msg ||
        err?.response?.data?.message ||
        `An error occured with status ${err?.response?.status || 401}`;
      // err?.response?.statusText
      showAlert("error", msg);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section
        className="w-full h-full bg-primary flex flex-col justify-center items-center
        -mt-16 pt-16 gap-6 pb-8 md:pb-0"
        style={{ minHeight: "min(75vh, 800px)" }}
        id="hero"
      >
        <h1 className="text-center text-6xl md:text-[5.5rem] text-base-50 font-bold max-w-2xl header-font leading-none">
          Stand out from the crowd
        </h1>
        <p className="text-base-50 text-xl md:text-2xl text-center max-w-3xl font-light">
          Share cold calls, showcase emails, and display your deals
        </p>
        <a
          className="btn btn-secondary text-xl w-80 h-12"
          style={{ borderRadius: 9999 }}
          href="#email-list"
        >
          Join the waitlist
        </a>
      </section>

      <section
        className="relative flex flex-col justify-center items-center"
        id="info"
      >
        <OvalSeperator className="w-full h-40 fill-primary absolute -top-1 z-0" />
        <article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-10 
          w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl flex flex-col justify-start items-center
          md:hover:scale-[1.005] transition-all duration-500 cursor-default"
        >
          <span className="text-md font-bold text-base-700 text-center">
            Visibility
          </span>
          <h2 className="font-bold text-4xl md:text-5xl text-center">
            Show your work, get more interviews
          </h2>
          <p className="mt-4 font-extralight text-center text-md max-w-xl">
            SalesFolio makes it easy to share your cold calls, email campaigns,
            achievements and deals. Show off your best work and share your Folio
            with interviewers to stand out.
          </p>
          <figure className="mt-4 relative flex justify-start items-start -gap-2">
            <figure className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4">
              <img
                src="/home/side-bar.png"
                className="w-40 md:w-56 h-auto transition-all duration-200"
              />
            </figure>
            <div>
              <figure className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4 -ms-5 mt-4 w-fit">
                <img
                  src="/home/player.png"
                  className="w-56 md:w-64 h-auto transition-all duration-200"
                />
              </figure>

              <figure className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4 -ms-8 mt-1 w-fit">
                <img
                  src="/home/email-content.png"
                  className="w-56 md:w-64 h-auto transition-all duration-200"
                />
              </figure>
            </div>
          </figure>
        </article>
      </section>

      <section className="relative flex justify-center items-start gap-8 flex-wrap py-8">
        <article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-10 gap-4
          w-full max-w-[95%] md:max-w-xl lg:max-w-lg flex flex-col justify-start items-center
          transition-all duration-500 cursor-default"
        >
          <span className="text-md font-bold text-base-700 text-center">
            Founders
          </span>
          <h2 className="font-bold text-4xl md:text-5xl text-center">
            Meet the team
          </h2>
          <div className="flex gap-8">
            <figure className="flex flex-col justify-center">
              <img src="/founder-eli.webp" className="w-36 h-36 rounded-full" />
              <h3 className="font-bold text-xl text-center">Eliezer Teferra</h3>
              <span className="text-center font-extralight">CEO & Founder</span>
            </figure>
            <figure className="flex flex-col justify-center">
              <img
                src="/founder-david.webp"
                className="w-36 h-36 rounded-full"
              />
              <h3 className="font-bold text-xl text-center">David Anderson</h3>
              <span className="text-center font-extralight">CTO & Founder</span>
            </figure>
          </div>

          <p>
            Eli & David first met working for Rogers Communications, selling
            Telecom services over the phone. After Rogers, Eli began work in the
            SaaS Sales sector, and David began work developing web applications.
            They reconnected and decided to combine their shared love of sales
            with a passion to innovate, resulting in SalesFolio!
          </p>
        </article>

        <article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-10 gap-4
          w-full max-w-[95%] md:max-w-xl lg:max-w-lg flex flex-col justify-start items-center
          transition-all duration-500 cursor-default"
        >
          <span className="text-md font-bold text-base-700 text-center">
            How it works
          </span>
          <h2 className="font-bold text-4xl md:text-5xl text-center">FAQ</h2>
          {faq.map((v, i) => (
            <div
              className="collapse collapse-plus bg-white shadow-md border rounded-xl md:rounded-2xl"
              key={v.question + i}
            >
              <input type="radio" name={`faqs`} defaultChecked={i === 0} />
              <div className="collapse-title text-xl font-medium">
                {v.question}
              </div>
              <div className="collapse-content">
                <p>{v.answer}</p>
              </div>
            </div>
          ))}
        </article>
      </section>

      <section
        className="relative flex flex-col justify-center items-center"
        id="email-list"
      >
        <article
          className={`rounded-2xl p-4 md:p-10 shadow-lg z-10 gap-4
          w-full max-w-[95%] md:max-w-2xl lg:max-w-4xl flex flex-col justify-start items-center
          transition-all duration-500 cursor-default ${
            submitted ? "bg-success" : "bg-primary"
          }`}
        >
          <h2 className="text-base-50 font-bold text-5xl text-center">
            Let's stay in touch
          </h2>

          <p className="text-base-50 text-lg md:text-xl text-center max-w-3xl">
            SalesFolio is coming out September 2024. To stay up to date with the
            Latest SalesFolio news, and to get access to the early beta, enter
            your email address below.
          </p>
          <form
            className="w-full flex justify-center items-center gap-4 flex-wrap"
            onSubmit={submitForm}
          >
            <label className="input rounded-full w-full max-w-96 flex items-center gap-2 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="grow transition-all duration-300"
                placeholder="Email"
                disabled={loading}
              />
            </label>

            <button
              className="btn btn-secondary text-xl h-12 justify-between pe-0 gap-4 flex-nowrap transition-all duration-300"
              style={{ borderRadius: 9999 }}
              href="#email-list"
              type="submit"
              disabled={loading || submitted}
            >
              Subscribe
              <div
                className={`h-full w-auto aspect-square rounded-full flex justify-center items-center
                transition-all duration-500 cursor-default ${
                  submitted ? "bg-success" : "bg-secondary"
                }`}
              >
                <FaAngleDoubleRight className="fill-base-50 h-7 w-7" />
              </div>
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
