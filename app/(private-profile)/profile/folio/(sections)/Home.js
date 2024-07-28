"use client";
import { useState, useRef } from "react";
import Alert from "@/components/Alert";
import Link from "next/link";

import { PiLaptopThin } from "react-icons/pi";
import { CiCircleList } from "react-icons/ci";

import MonthYearPicker from "@/components/MonthYearPicker";

const industries = [
  "Aerospace",
  "Agriculture",
  "Automotive",
  "Biotechnology",
  "Building Materials",
  "Chemicals",
  "Construction Equipment",
  "Consulting",
  "Consumer Goods",
  "Dental",
  "Educational Services",
  "Educational Software",
  "Financial Services",
  "Food and Beverage",
  "Government",
  "Hardware",
  "Healthcare IT",
  "Hospitality",
  "Human Resources",
  "Industrial Equipment",
  "IT Services",
  "Marketing and Advertising",
  "Medical Devices",
  "Office Supplies and Equipment",
  "Oil and Gas",
  "Pharmaceuticals",
  "Real Estate",
  "Renewable Energy",
  "Retail",
  "Software",
  "Telecommunications",
  "Transportation and Logistics",
  "Utilities",
  "Veterinary",
];

const software = [
  "Apollo",
  "DiscoverOrg",
  "Einstein",
  "Freshsales",
  "HubSpot",
  "Insightly",
  "LeadGenius",
  "LinkedIn",
  "Microsoft Dynamics",
  "Pipedrive",
  "Sales Cloud",
  "Salesforce",
  "SalesLoft",
  "Salesmate",
  "Zoho",
  "ZoomInfo",
];

export default function Home({ user }) {
  const [aboutMe, setAboutMe] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [workHistory, setWorkHistory] = useState(
    Array(3).fill({ company: "", start: "", end: "" })
  );

  const setCompany = (text, i) => {
    setWorkHistory((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], company: text };
      return updatedInputs;
    });
  };

  const setStartDate = (e, i) => {
    e.preventDefault();
    const text = e.target.value;
    setWorkHistory((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], start: text };
      return updatedInputs;
    });
  };

  const setEndDate = (e, i) => {
    e.preventDefault();
    const text = e.target.value;
    setWorkHistory((previous) => {
      let updatedInputs = [...previous];
      updatedInputs[i] = { ...updatedInputs[i], end: text };
      return updatedInputs;
    });
  };

  return (
    <section id="home" className="flex flex-col w-full gap-8 pb-20">
      <h2 className="header-font text-4xl">About Me</h2>
      <div className="flex flex-col">
        <span className="mb-4 font-extralight">
          Add some text about you here is why etc etc etc
        </span>
        <label for="about-me" className="text-sm text-base-700">
          Description
        </label>
        <textarea
          className="w-full min-h-52 rounded-2xl border-2 border-dashed border-base p-4  focus-visible:outline-none focus:shadow transition-all duration-300"
          placeholder="Tell us about yourself! What inspires you, what do you like about sales, etc etc etc"
          value={aboutMe}
        />
      </div>

      <div className="flex flex-col">
        <span className="mb-4 font-extralight">
          Want to really stand out? Add a video. etc etc etc
        </span>
        <label for="video-url" className="text-sm text-base-700">
          Video URL
        </label>
        <input
          type="url"
          id="video-url"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-around items-start gap-4 sm:gap-4 md:h-[470px]">
        <div className="flex-1 w-full h-full flex flex-col">
          <h3 className="font-semibold text-2xl flex justify-center items-center mb-2 flex-nowrap whitespace-nowrap">
            <CiCircleList className="h-6 w-6 me-2 fill-base-dark" />
            Work History
          </h3>
          <ul
            className="flex flex-col gap-4"
          >
            {workHistory.map((work, i) => {
              return (
                <li
                  key={i}
                  className={`flex flex-col w-full gap-2
                       items-start justify-center self-center`}
                >
                  <div className="w-full">
                    <label
                      htmlFor="company"
                      className="font-extralight"
                    >
                      I worked at
                    </label>
                    <input
                      type="text"
                      id="company"
                      maxLength={64}
                      value={work.company}
                      onChange={(e) => setCompany(e.target.value, i)}
                      className={`w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300`}
                      placeholder={["Microsoft", "Google", "Amazon"][i]}
                    />
                  </div>
                  <div className="flex gap-2 justify-center items-center w-full">

                    <MonthYearPicker
                      className="text-sm rounded-2xl border-2 border-dashed border-base bg-white"
                      value={work.start || null}
                      onChange={(e) => setStartDate(e, i)}
                    />
                    <span className="font-extralight">
                      to
                    </span>
                    <MonthYearPicker
                      className="text-sm rounded-2xl border-2 border-dashed border-base bg-white"
                      value={work.end || null}
                      onChange={(v) => setEndDate(v, i)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 w-full h-full flex flex-col">
          <h3 className="font-semibold text-2xl flex justify-center items-center mb-2 flex-nowrap whitespace-nowrap">
            <PiLaptopThin className="h-6 w-6 me-2 fill-base-dark" />
            Software
          </h3>
          <ul
            className="bg-white rounded-2xl border-2 border-dashed border-base p-4 
            focus-visible:outline-none focus:shadow transition-all duration-300
            flex-1 w-full overflow-scroll max-h-80 md:max-h-full"
          >
            {software.map((software, i) => {
              return (
                <label className="label cursor-pointer w-full gap-2 flex-nowrap">
                  <span className="label-text">{software}</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 w-full h-full flex flex-col">
          <h3 className="font-semibold text-2xl flex justify-center items-center mb-2 flex-nowrap whitespace-nowrap">
            <PiLaptopThin className="h-6 w-6 me-2 fill-base-dark" />
            Industries
          </h3>
          <div
            className="bg-white rounded-2xl border-2 border-dashed border-base p-4 
            focus-visible:outline-none focus:shadow transition-all duration-300
            flex-1 w-full overflow-scroll max-h-80 md:max-h-full"
          >
            {industries.map((industry, i) => {
              return (
                <label className="label cursor-pointer w-full gap-2 flex-nowrap">
                  <span className="label-text">{industry}</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
