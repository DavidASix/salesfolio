"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaAngleDoubleRight } from "react-icons/fa";
import { TbMailCheck } from "react-icons/tb";

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

  // Motion Translations
  const { scrollYProgress } = useScroll();
  const invertScrollYProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const quickFade = useTransform(scrollYProgress, [0, 0.25, 1], [1, 0, 0]);
  const rotateLeftFast = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["5deg", "-45deg", "0deg"]
  );
  const rotateLeftSlow = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["-5deg", "-70deg", "0deg"]
  );
  const rotateRightFast = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["-5deg", "45deg", "0deg"]
  );
  const rotateRightSlow = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["-5deg", "-70deg", "0deg"]
  );
  const moveLeftOffScreen = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-100vw"]
  );
  const moveRightOffScreen = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100vw"]
  );
  const moveDown = useTransform(scrollYProgress, [0, 1], [0, 500]);

  async function submitForm(e) {
    "use client";
    e.preventDefault();
    try {
      setLoading(true);
      if (!regex.email.test(email)) {
        throw "Email Invalid";
      }
      await axios.post("/api/marketing/recordEmail", { email });
      setSubmitted(true);
    } catch (err) {
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
      {/* <motion.div 
        className='h-full w-3 fixed top-0 right-1 z-10 origin-top
        bg-accent rounded-full opacity-90' 
        style={{ scaleY: scrollYProgress }} />   */}
      {/* <motion.div 
        className='hidden md:block h-36 w-36 absolute top-36 md:-left-5 lg:left-20 z-0 origin-top
        bg-accent-200 rounded-xl' 
        style={{
          translateX: translateX, 
          translateY: translateY, 
          opacity: quickFade,
          rotate: rotateLeft
        }} />   */}
      <motion.figure
        className="hidden lg:block absolute top-[9rem] lg:left-0 xl:left-20 z-10 origin-top
        bg-white shadow-2xl border border-base-400 rounded-xl md:rounded-2xl w-fit p-4"
        style={{
          translateX: moveLeftOffScreen,
          translateY: moveDown,
          opacity: quickFade,
          rotate: rotateLeftFast,
        }}
      >
        <img
          src="/home/email-content.png"
          className="w-40 md:w-48 h-auto transition-all duration-200"
        />
      </motion.figure>

      <motion.figure
        className="hidden lg:block absolute top-[28rem] lg:left-2 xl:left-20 z-10 origin-top
        bg-white shadow-2xl border border-base-400 rounded-xl md:rounded-2xl w-fit p-4"
        style={{
          translateX: moveLeftOffScreen,
          translateY: moveDown,
          opacity: quickFade,
          rotate: rotateLeftSlow,
        }}
      >
        <img
          src="/home/player.png"
          className="w-56 md:w-64 h-auto transition-all duration-200"
        />
      </motion.figure>

      <motion.figure
        className="hidden lg:block absolute top-[5rem] lg:right-2 xl:right-20 z-10 origin-top
        bg-white shadow-2xl border border-base-400 rounded-xl md:rounded-2xl w-fit p-4"
        style={{
          translateX: moveRightOffScreen,
          translateY: moveDown,
          opacity: quickFade,
          rotate: rotateRightFast,
        }}
      >
        <img
          src="/home/side-bar.png"
          className="w-40 md:w-44 h-auto transition-all duration-200"
        />
      </motion.figure>

      <section
        className="w-full h-full bg-primary flex flex-col justify-center items-center
        -mt-16 pt-16 gap-6 pb-8 md:pb-0"
        style={{ minHeight: "min(75vh, 800px)" }}
        id="hero"
      >
        <h1 className="z-50 text-center text-6xl md:text-[5.5rem] text-base-50 font-bold max-w-2xl header-font leading-none">
          Stand out from the crowd
        </h1>
        <div className="text-center z-50">
          <p className="text-base-50 text-xl md:text-2xl text-center max-w-3xl font-light">
            Share cold calls, showcase emails, and display your deals
          </p>
          <span className="text-sm font-extralight text-base-50 text-center">
            Coming September 2024
          </span>
        </div>
        <a
          className="btn btn-secondary text-xl w-80 h-12 z-50"
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
        <OvalSeperator className="w-full h-10 md:h-40 fill-primary absolute -top-1 z-0" />
        <article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-20 -mt-7 md:mt-0
          w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl flex flex-col justify-start items-center
           transition-all duration-500 cursor-default"
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
            <motion.figure
              className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4 z-10"
              transition={{ delay: 0.1, duration: 0.25 }}
              initial={{ opacity: 0, translateY: 15 }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <img
                src="/home/side-bar.png"
                className="w-40 md:w-56 h-auto transition-all duration-200"
              />
            </motion.figure>
            <div className="z-20">
              <motion.figure
                className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4 -ms-5 mt-4 w-fit z-20"
                transition={{ delay: 0.15, duration: 0.25 }}
                initial={{ opacity: 0, translateX: 15 }}
                whileInView={{ opacity: 1, translateX: 0 }}
              >
                <img
                  src="/home/player.png"
                  className="w-56 md:w-64 h-auto transition-all duration-200"
                />
              </motion.figure>

              <motion.figure
                className="bg-white shadow-md border rounded-xl md:rounded-2xl p-2 md:p-4 -ms-8 mt-1 w-fit z-20"
                transition={{ delay: 0.3, duration: 0.25 }}
                initial={{ opacity: 0, translateX: 15 }}
                whileInView={{ opacity: 1, translateX: 0 }}
              >
                <img
                  src="/home/email-content.png"
                  className="w-56 md:w-64 h-auto transition-all duration-200"
                />
              </motion.figure>
            </div>
          </figure>
        </article>
      </section>

      <section className="relative flex justify-center items-start gap-8 flex-wrap py-8">
        <motion.article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-20 gap-4
          w-full max-w-[95%] md:max-w-xl lg:max-w-lg flex flex-col justify-start items-center
          transition-all duration-500 cursor-default"
          viewport={{ once: true }}
          transition={{ delay: 0.0, duration: 0.35 }}
          initial={{ scale: 0.9, translateY: 30 }}
          whileInView={{ scale: 1, translateY: 0 }}
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
        </motion.article>

        <motion.article
          className="bg-base-50 rounded-2xl p-4 md:p-10 border shadow-lg z-20 gap-4
          w-full max-w-[95%] md:max-w-xl lg:max-w-lg flex flex-col justify-start items-center
          transition-all duration-500 cursor-default"
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.5 }}
          initial={{ scale: 0.9, translateY: 30 }}
          whileInView={{ scale: 1, translateY: 0 }}
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
        </motion.article>
      </section>

      <section
        className="relative flex flex-col justify-center items-center"
        id="email-list"
      >
        <article
          className={`rounded-2xl px-4 py-8 md:p-10 shadow-lg z-20 gap-4
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
              <TbMailCheck
                className={`${
                  submitted ? "stroke-success" : "stroke-primary"
                } h-6 w-6 transition-all duration-300`}
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow"
                placeholder="Email"
                disabled={loading || submitted}
              />
            </label>

            <button
              className="btn btn-secondary text-xl h-12 justify-between pe-0 gap-4 flex-nowrap transition-all duration-300"
              style={{ borderRadius: 9999 }}
              type="submit"
              disabled={loading || submitted}
            >
              Subscribe
              <span
                className={`h-full w-auto aspect-square rounded-full flex justify-center items-center
                transition-all duration-500 cursor-default ${
                  submitted ? "bg-success" : "bg-secondary"
                }`}
              >
                <FaAngleDoubleRight className="fill-base-50 h-7 w-7" />
              </span>
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
