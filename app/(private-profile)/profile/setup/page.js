"use client";
import { useState, useRef } from "react";

import Alert from "@/components/Alert";

import Username from "./(screens)/Username";
import Location from "./(screens)/Location";

const screens = [Username, Location];

export default function Setup() {
  const [step, setStep] = useState(1);
  const screensContainer = useRef(null);
  const alertRef = useRef(null);

  const onError = (type, msg) => {
    alertRef.current.showAlert(type, msg);
  }

  const goNextStep = () => {
    if (step === screens.length - 1) {
      // Submit button click
    }
    // Next Button Click
    setStep((prev) => {
      prev + 1;
      screensContainer.current.scrollLeft +=
        screensContainer.current.offsetWidth;
    });
  };

  const goBackStep = () => {
    setStep((prev) => {
      prev - 1;
      screensContainer.current.scrollLeft -=
        screensContainer.current.offsetWidth;
    });
  };

  return (
    <>
      <Alert ref={alertRef} />
      <section className="section-padding h-[100vh] -mt-16 pt-16">
        <article className="content-container h-full py-8 flex flex-col">
          <h1 className="text-4xl font-light">
            Welcome to{" "}
            <span className="text-primary-800 font-normal">
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
              />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
