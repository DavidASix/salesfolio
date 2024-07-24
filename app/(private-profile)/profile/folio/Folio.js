"use client";
import { useState, useRef } from "react";
import Alert from "@/components/Alert";

export default function Folio({ session }) {
  const alertRef = useRef(null);
  return (
    <>
      <Alert ref={alertRef} />
      <section className="section-padding min-h-screen -mt-16 pt-16 px-2">
        <div
          className="content-container min-h-full flex flex-col 
            bg-base-50 border-x border-base-200 px-4 pb-4
             rounded-t-3xl"
        ></div>
      </section>
    </>
  );
}
