"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaAngleDoubleRight } from "react-icons/fa";
import { TbMailCheck } from "react-icons/tb";

import { AlertContext } from "@/components/AlertContext";
import regex from "@/utils/regex";
import type { FAQ } from "@/utils/types";

import OvalSeperator from "@/components/svgs/oval-seperator-thin.svg";

const faq: FAQ = [
  {
    question: "What is SalesFolio?",
    answer:
      "SalesFolio is a sharable Sales Portfolio designed to help you easily track and showcase your sales achievements. With SalesFolio, you can log cold calls, upload deal information, and even add videos. To boost credibility, we’ve included a peer verification feature, allowing your colleagues to confirm the validity of your claims.",
  },
  {
    question: "How do I verify deals?",
    answer:
      'When you close a deal or book a meeting, you can log it in your SalesFolio. Share a link to the achievement, and others on the platform can verify your achievement by clicking the "Verify" button.',
  },
  {
    question: "What if I don’t want to share?",
    answer:
      'We get it—sometimes you want to keep certain information private, like cold call recordings or specific deal details. That’s why we’ve added a "Private" button. If you have content in your SalesFolio that you’d rather not share publicly, change the visibility to "Private", which will ensure only you, have access to it.',
  },
  {
    question: "How does this differ from Linkedin?",
    answer:
      "SalesFolio is unique because it allows salespeople to create an online portfolio detailing their work in a structured way. This allows hiring managers and recruiters to easily browse and understand your achievements, not just your work history.",
  },
  {
    question: "How much does it cost?",
    answer: "SalesFolio is FREE!",
  },
];

export default function Home() {
  const { showAlert } = useContext(AlertContext);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

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
      let msg: string = typeof err === "string" ? err : null;
      if (msg === null) {
        msg =
          err?.response?.data?.message ||
          `An error occured with status ${err?.response?.status || 401}`;
      }

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
          src="/images/home/email-content.png"
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
          src="/images/home/player.png"
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
          src="/images/home/side-bar.png"
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
                src="/images/home/side-bar.png"
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
                  src="/images/home/player.png"
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
                  src="/images/home/email-content.png"
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
            Our Story
          </h2>
          <div className="flex gap-8">
            <figure className="flex flex-col justify-center items-center">
              <img
                src="/images/founder-eli.webp"
                className="w-36 h-36 rounded-full"
              />
              <figcaption className="text-center">
                <h3 className="font-bold text-xl text-center">
                  Eliezer Teferra
                </h3>
                <span className="text-center font-extralight">
                  Co-Founder
                  <br />
                  Business Lead
                </span>
              </figcaption>
            </figure>
            <figure className="flex flex-col justify-center items-center">
              <img
                src="/images/founder-david.webp"
                className="w-36 h-36 rounded-full"
              />
              <figcaption className="text-center">
                <h3 className="font-bold text-xl text-center">
                  David Anderson
                </h3>
                <span className="text-center font-extralight">
                  Co-Founder
                  <br />
                  Technical Lead
                </span>
              </figcaption>
            </figure>
          </div>

          <p>
            Salesfolio was born out of a simple yet frustrating challenge: “How
            do you showcase your sales achievements to hiring managers in a way
            that truly reflects your hard work?”
          </p>
          <p>
            We realized that despite the countless meetings we’d booked and the
            revenue we’d generated, there was no easy way to document and share
            these successes. That’s why we created Salesfolio.
          </p>
          <p>
            With Salesfolio, you can document your successes and, for added
            credibility, have your peers verify your achievements. It's more
            than just a portfolio—it's a powerful tool to demonstrate your
            impact and stand out in a competitive job market.
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
            latest SalesFolio news and to get access to the early beta enter
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
