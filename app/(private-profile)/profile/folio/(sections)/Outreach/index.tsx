"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";
import { AlertContext } from "@/components/AlertContext";
import OutreachUpload from "./OutreachUpload";
import OutreachItem from "./OutreachItem";

const pageSize = 2;

const outreachTypes = {
  call: {
    slug: "call",
    title: "Cold Call",
    icon: BsTelephone,
  },
  email: {
    slug: "email",
    title: "Email",
    icon: BsEnvelopeAt,
  },
  creative: {
    slug: "creative",
    title: "Creative",
    icon: BsLightbulb,
  },
};

const outreachSlugs = [...Object.keys(outreachTypes)] as const;
type OutreachTypes = (typeof outreachSlugs)[number];

export default function OutreachPage({ profile }) {
  const { showAlert } = useContext(AlertContext);
  const firstRender = useRef(true);
  const [outreachList, setOutreachList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getNextPage = async (page: number) => {
    try {
      const { data } = await axios.post("/api/outreach/getPage", {
        page,
        pageSize,
        username: profile.username,
      });
      setOutreachList((previous) => [...previous, ...data]);
    } catch (err) {
      console.log(err);
      showAlert("error", "error occured");
    }
  };

  useEffect(() => {
    // In strict mode, React calls useEffect twice on first render
    // This is done to highlight problems as regardless of times run the initialization
    // ... useEffect should only have an effect once.
    // To skip the second render, we use useRef to check if a render has been complete.
    if (firstRender.current) {
        firstRender.current = false;
        getNextPage(1);
    }
  }, []);

  return (
    <section id="outreach" className="flex flex-col w-full gap-8 pb-20">
      <h2 className="header-font text-4xl">Outreach!</h2>
      <p className="mb-4 font-extralight">
        Did you complete a killer cold call, write an amazing email, or have
        some creative outreach strategy? Brag about it here.
      </p>
      {/* Add new outreach card */}
      <OutreachUpload />
      <div className="flex flex-col w-full items-center gap-8">
        {outreachList.map((outreach, i) => 
            <OutreachItem outreach={outreach} key={outreach.id + i} />
        )}
      </div>
    </section>
  );
}
