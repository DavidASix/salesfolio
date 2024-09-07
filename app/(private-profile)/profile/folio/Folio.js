"use client";
import { useState } from "react";
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
  //BsGraphUpArrow,
  BsPen,
} from "react-icons/bs";

import Home from "./(sections)/Home";
import OutreachPage from "./(sections)/Outreach/";
import Deals from "./(sections)/Deals";
import Highlights from "./(sections)/Highlights";
//import Stats from "./(sections)/Stats";

const tabs = [
  { slug: "home", title: "Home", icon: AiOutlineHome, tab: Home },
  {
    slug: "outreach",
    title: "Outreach",
    icon: AiOutlineNotification,
    tab: OutreachPage,
  },
  { slug: "deals", title: "Deals", icon: LiaPenAltSolid, tab: Deals },
  { slug: "highlights", title: "Highlights", icon: LiaAwardSolid, tab: Highlights },
  //{ slug: "kpis", title: "KPI's", icon: BsGraphUpArrow, tab: Stats },
];

export default function Folio({ profile }) {
  const [activeTab, setActiveTab] = useState("home");
  const aside = {
    list: [
      {
        key: "location",
        value: profile?.location,
        icon: BsFillPinMapFill,
        text: profile?.location,
      },
      {
        key: "company",
        value: profile?.company,
        icon: BsBuildings,
        text: profile?.company,
      },
      {
        key: "firstSalesYear",
        value: profile?.firstSalesYear,
        icon: BsCalendar2Month,
        text: profile?.firstSalesYear
          ? `${new Date().getFullYear() - profile?.firstSalesYear || 1} Year${
              new Date().getFullYear() - profile?.firstSalesYear ? "s" : ""
            } in sales`
          : false,
      },
    ],
    socials: [
      {
        key: "twitter",
        value: profile?.twitter,
        icon: BsTwitterX,
        link: `https://x.com/${profile?.twitter}`,
      },
      {
        key: "linkedin",
        value: profile?.linkedinUrl,
        icon: FaLinkedinIn,
        link: profile?.linkedinUrl,
      },
      {
        key: "publicEmail",
        value: profile?.publicEmail,
        icon: BsEnvelopeAt,
        link: `mailto:${profile?.publicEmail}`,
      },
      {
        key: "publicPhone",
        value: profile?.publicPhone,
        icon: BsTelephone,
        link: `tel:${profile?.publicPhone}`,
      },
      {
        key: "website",
        value: profile?.website,
        icon: BsGlobe,
        link: `${profile?.website}`,
      },
    ],
  };

  const CurrentTab = tabs.filter((t) => t.slug === activeTab)[0].tab;
  return (
    <>
      <section className="section-padding lg:h-screen -mt-16 pt-16 px-2">
        <div
          className="content-container h-full flex 
            flex-col gap-4 items-center
            lg:flex-row lg:gap-0 lg:justify-center lg:items-stretch"
        >
          <aside
            className="relative h-min-content w-full lg:max-w-xs flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6
            items-center lg:items-start"
          >
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
                  src={profile?.image || "/default-user.webp"}
                  alt="Image Preview"
                  className="h-full w-full aspect-square object-cover rounded-full z-10"
                />
              </div>
            </figure>

            <div className="flex flex-col gap-2 sm:gap-6 justify-center px-2 items-center sm:items-start">
              <div>
                <h1 className="text-4xl font-semibold text-center sm:text-start">
                  {profile?.name}
                </h1>
                <h2 className="text-xl font-extralight text-center sm:text-start">
                  {profile?.role}
                </h2>
              </div>
              {aside.socials.reduce(
                (accum, social) => accum + (social.value || ""),
                ""
              ) ? (
                <ul className="flex gap-4">
                  {aside.socials.map((li, i) =>
                    li.value ? (
                      <li key={`${li.key}${i}`}>
                        <a href={li.link} className="group">
                          <li.icon className="h-5 w-5 group-hover:fill-primary transition-colors duration-200" />
                        </a>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
              ) : null}
            </div>

            <div className="flex flex-col gap-1 justify-center px-2">
              {aside.list.map((li, i) =>
                li.value ? (
                  <p
                    key={`${li.key}${i}`}
                    className="flex text-lg font-extralight items-center"
                  >
                    <li.icon className="h-5 w-5 me-4" />
                    {li.text}
                  </p>
                ) : (
                  ""
                )
              )}
            </div>
          </aside>

          <div className="flex flex-col flex-1 max-w-3xl w-full relative">
            <ul className="z-10 flex gap-2 w-full -mb-[1px] rounded-e-2xl rounded-tl-2xl overflow-scroll no-scrollbar">
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
                bg-base-50 border-x border-t border-base
                rounded-tr-3xl overflow-y-scroll
                px-4 pt-4 lg:px-8 lg:pt-8"
            >
              <CurrentTab profile={profile} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
