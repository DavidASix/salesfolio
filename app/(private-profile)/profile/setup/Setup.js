"use client";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Alert from "@/components/Alert";

import Username from "./(screens)/Username";
import ProfilePicture from "./(screens)/ProfilePicture";
import Location from "./(screens)/Location";
import CurrentEmployement from "./(screens)/CurrentEmployement";
import WorkHistory from "./(screens)/WorkHistory";
import TimeInSales from "./(screens)/TimeInSales";

const screens = [
  Username,
  ProfilePicture,
  Location,
  CurrentEmployement,
  WorkHistory,
  TimeInSales,
];

export default function Setup({ user }) {
  const [step, setStep] = useState(1);
  const screensContainer = useRef(null);
  const alertRef = useRef(null);
  const router = useRouter();

  const onError = (type, msg) => {
    alertRef.current.showAlert(type, msg);
  };

  const goNextStep = async () => {
    if (step === screens.length) {
      // Submit button click
      await axios.post("/api/user/setValue", {
        key: "firstLogin",
        value: false,
      });
      router.replace("/profile");
    }

    // Next Button Click
    setStep((prev) => {
      screensContainer.current.scrollLeft +=
        screensContainer.current.offsetWidth;
      return prev + 1;
    });
  };

  const goBackStep = () => {
    setStep((prev) => {
      screensContainer.current.scrollLeft -=
        screensContainer.current.offsetWidth;
      return prev - 1;
    });
  };

  return (
    <>
      <Alert ref={alertRef} />
      <section className="section-padding h-[100vh] -mt-16 pt-16">
        <article className="content-container h-full pt-8 flex flex-col">
          <h1 className="text-4xl font-light header-font">
            Welcome to{" "}
            <span className="text-primary-800 font-normal header-font">
              Sales<span className="font-bold">Folio</span>
            </span>
          </h1>
          <p className="ps-4 mt-2 mb-4 text-2xl font-extralight">
            Let's set up your profile...
          </p>
          <div
            id="inputScreen"
            ref={screensContainer}
            className="flex-1 w-full flex
          overflow-x-hidden snap-mandatory snap-x scroll-smooth"
          >
            {screens.map((Screen, i) => (
              <Screen
                key={i}
                index={i}
                final={i === screens.length - 1}
                goNextStep={goNextStep}
                goBackStep={goBackStep}
                onError={onError}
                user={user}
              />
            ))}
          </div>
        </article>
      </section>
      </>
  );
}
