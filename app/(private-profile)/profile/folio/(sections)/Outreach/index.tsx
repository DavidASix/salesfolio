import React from "react";
import OutreachUpload from "./OutreachUpload";
import OutreachList from './OutreachList'

// Keeping this in for future filtering of history
// const outreachTypes = {
//   call: {
//     slug: "call",
//     title: "Cold Call",
//     icon: BsTelephone,
//   },
//   email: {
//     slug: "email",
//     title: "Email",
//     icon: BsEnvelopeAt,
//   },
//   creative: {
//     slug: "creative",
//     title: "Creative",
//     icon: BsLightbulb,
//   },
// };

// const outreachSlugs = [...Object.keys(outreachTypes)] as const;
// type OutreachTypes = (typeof outreachSlugs)[number];

export default function OutreachPage({ profile }) {
  return (
    <section id="outreach" className="flex flex-col w-full pb-20">
      {/* Add new outreach card */}
      <OutreachUpload />
      <h2 className="header-font text-4xl mt-6 mb-6">
        My Outreach
      </h2>
      <OutreachList profile={profile} />
    </section>
  );
}
