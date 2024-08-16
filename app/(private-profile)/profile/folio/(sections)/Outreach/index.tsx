"use client";
import React from "react";
import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";
import OutreachUpload from "./OutreachUpload";

const outreachTypes = [
  { slug: "call", title: "Cold Call", icon: BsTelephone },
  { slug: "email", title: "Email", icon: BsEnvelopeAt },
  { slug: "creative", title: "Creative", icon: BsLightbulb },
];

const outreachSlugs = [...outreachTypes.map((v) => v.slug)] as const;
type OutreachTypes = (typeof outreachSlugs)[number];

export default function OutreachPage({ user }) {
  return (
    <section id="outreach" className="flex flex-col w-full gap-8 pb-20">
      <h2 className="header-font text-4xl">Outreach!</h2>
      <p className="mb-4 font-extralight">
        Did you complete a killer cold call, write an amazing email, or have
        some creative outreach strategy? Brag about it here.
      </p>
      {/* Add new outreach card */}
      <OutreachUpload />
    </section>
  );
}
