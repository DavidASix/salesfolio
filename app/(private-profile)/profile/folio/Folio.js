"use client";
import { useState, useRef } from "react";
import Alert from "@/components/Alert";
import Link from "next/link";

import { AiOutlineHome, AiOutlineNotification } from "react-icons/ai";
import { LiaPenAltSolid, LiaAwardSolid } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa6";
import {
  BsTwitterX,
  BsGlobe,
  BsTelephone,
  BsEnvelopeAt,
  BsFillPinMapFill,
  BsBuildings,
  BsCalendar2Month,
  BsGraphUpArrow,
  BsPen,
} from "react-icons/bs";

const tabs = [
  { slug: "home", title: "Home", icon: AiOutlineHome },
  { slug: "outreach", title: "Outreach", icon: AiOutlineNotification },
  { slug: "deals", title: "Deals", icon: LiaPenAltSolid },
  { slug: "highlights", title: "Highlights", icon: LiaAwardSolid },
  { slug: "kpis", title: "KPI's", icon: BsGraphUpArrow },
];

export default function Folio({ session }) {
  const [activeTab, setActiveTab] = useState("home");
  const alertRef = useRef(null);
  const user = session?.user;
  const aside = {
    list: [
      {
        key: "location",
        value: user?.location,
        icon: BsFillPinMapFill,
        text: user?.location,
      },
      {
        key: "company",
        value: user?.company,
        icon: BsBuildings,
        text: user?.company,
      },
      {
        key: "location",
        value: user?.firstSalesYear,
        icon: BsCalendar2Month,
        text: user?.firstSalesYear
          ? `${new Date().getFullYear() - user?.firstSalesYear || 1} Year${
              new Date().getFullYear() - user?.firstSalesYear ? "s" : ""
            } in sales`
          : false,
      },
    ],
    socials: [
      {
        key: "twitter",
        value: user?.twitter,
        icon: BsTwitterX,
        link: `https://x.com/${user?.twitter}`,
      },
      {
        key: "linkedin",
        value: user?.linkedinUrl,
        icon: FaLinkedinIn,
        link: user?.linkedinUrl,
      },
      {
        key: "publicEmail",
        value: user?.publicEmail,
        icon: BsEnvelopeAt,
        link: `mailto:${user?.publicEmail}`,
      },
      {
        key: "publicPhone",
        value: user?.publicPhone,
        icon: BsTelephone,
        link: `tel:${user?.publicPhone}`,
      },
      {
        key: "website",
        value: user?.website,
        icon: BsGlobe,
        link: `${user?.website}`,
      },
    ],
  };

  return (
    <>
      <Alert ref={alertRef} />
      <section className="section-padding h-screen -mt-16 pt-16 px-2">
        <div className="content-container h-full flex flex-col lg:flex-row gap-4 lg:gap-0">
          <aside className="relative h-min-content w-full lg:w-[300px] flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6
            items-center lg:items-start">
            <Link
              href="/profile/settings"
              className="group z-30 absolute top-0 right-2 h-10 w-10 flex justify-center items-center"
            >
              <BsPen className="h-6 w-6 fill-primary-900 group-hover:fill-primary transition-all duration-200" />
            </Link>

            <figure className="max-w-[250px] lg:max-w-full px-4 h-full w-auto md:h-auto md:w-full flex justify-center items-center">
              <div className="relative h-full w-full flex">
                <div className="h-full aspect-square bg-primary rounded-full absolute -left-1 -bottom-1 z-0" />
                <img
                  src={session?.user?.image || "/default-user.webp"}
                  alt="Image Preview"
                  className="h-full w-full aspect-square object-cover rounded-full z-10"
                />
              </div>
            </figure>

            <div className="flex flex-col gap-2 sm:gap-6 justify-center px-2 items-center sm:items-start">
              <div>
                <h1 className="text-4xl font-semibold text-center sm:text-start">{user?.name}</h1>
                <h2 className="text-xl font-extralight text-center sm:text-start">{user?.role}</h2>
              </div>
              <ul className="flex gap-4">
                {aside.socials.map((li, i) =>
                  li.value ? (
                    <li>
                      <a href={li.link} className="group">
                        <li.icon className="h-5 w-5 group-hover:fill-primary transition-colors duration-200" />
                      </a>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-1 justify-center px-2">
              {aside.list.map((li, i) =>
                li.value ? (
                  <p className="flex text-lg font-extralight items-center">
                    <li.icon className="h-5 w-5 me-4" />
                    {li.text}
                  </p>
                ) : (
                  ""
                )
              )}
            </div>
          </aside>

          <div className="flex flex-col flex-1">
            <ul className="flex gap-2 lg:gap-4 w-full z-10 -mb-[1px] overflow-scroll rounded-e-2xl">
              {tabs.map((tab, i) => (
                <li key={i}>
                  <button
                    className={`folio-tab ${
                      activeTab !== tab.slug ? "folio-tab-inactive" : ""
                    }`}
                    onClick={() => setActiveTab(tab.slug)}
                  >
                    <tab.icon className="h-5 w-5 fill-base-dark" /> {tab.title}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="flex-1 z-0 min-h-[80vh] sm:min-h-0
                bg-base-50 border-x border-t border-base px-4 pb-4
                rounded-tr-3xl overflow-y-scroll"
            >
              <span>Card Content</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
