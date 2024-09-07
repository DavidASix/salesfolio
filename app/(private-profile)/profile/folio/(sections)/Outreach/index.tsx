import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import OutreachUpload from "./OutreachUpload";
import OutreachList from "./OutreachList";
import { AlertContext } from "@/components/AlertContext";
import formatClientError from "@/utils/client-error";

const pageSize = 5;
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
  const hasFetchedOnce = useRef(false);
  const { showAlert } = useContext(AlertContext);
  const [outreachList, setOutreachList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [outreachItemCount, setOutreachItemCount] = useState<number>(null);
  const [dataRefreshRequired, setDataRefreshRequired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In strict mode, React calls useEffect twice on first render
    // This is done to highlight problems as regardless of times run the initialization
    // ... useEffect should only have an effect once.
    // To skip the second render, we use useRef to check if a render has been complete.
    if (!hasFetchedOnce.current) {
      getCurrentPage();
      getOutreachItemCount();
      hasFetchedOnce.current = true;
    }
  }, []);

  useEffect(() => {
    // Loading is set by requestNextPage
    if (!loading) {
      return;
    }
    // Don't run for first page, that's handled by the fetchedOnce effect
    if (currentPage <= 1) {
      return;
    }
    if (dataRefreshRequired) {
      // Data has either been deleted or added from the database
      // Refresh the entire client side list
      refreshContent();
    } else {
      getCurrentPage();
    }
  }, [currentPage]);

  const getOutreachItemCount = async () => {
    try {
      const { data } = await axios.post("/api/outreach/getUserOutreachCount", {
        username: profile.username,
      });
      setOutreachItemCount(data);
    } catch (err) {
      const { message } = formatClientError(err);
      showAlert("error", message);
    }
  };

  const getCurrentPage = async () => {
    try {
      const { data } = await axios.post("/api/outreach/getPage", {
        page: currentPage,
        pageSize,
        username: profile.username,
      });
      setOutreachList((previous) => [...previous, ...data]);
    } catch (err) {
      console.log(err);
      const { message } = formatClientError(err);
      showAlert("error", message);
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = async () => {
    try {
      const { data } = await axios.post("/api/outreach/getUpToPage", {
        page: currentPage,
        pageSize,
        username: profile.username,
      });
      setOutreachList(() => data);
      setDataRefreshRequired(false);
    } catch (err) {
      console.log(err);
      const { message } = formatClientError(err);
      showAlert("error", message);
    } finally {
      setLoading(false);
    }
  };

  const requestNextPage = async () => {
    if (outreachItemCount <= outreachList.length) {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    setCurrentPage((page) => page + 1);
  };

  function addNewOutreach(outreach) {
    // Server upload is handled by OutreachUpload
    // This function is called after successful upload
    // Update the outreach list without re-fetching
    setOutreachList([outreach, ...outreachList]);
    // Update flag to ensure a full refresh is done if another page is loaded
    setDataRefreshRequired(true);
    setOutreachItemCount((c) => c + 1);
  }

  return (
    <section id="outreach" className="flex flex-col w-full pb-20">
      {/* Add new outreach card */}
      <OutreachUpload passOutreachToDisplay={addNewOutreach} />
      <h2 className="header-font text-4xl mt-6 mb-6">My Outreach</h2>
      <OutreachList
        entryList={outreachList}
        loadNextPage={requestNextPage}
        loading={loading}
        outreachItemCount={outreachItemCount}
      />
    </section>
  );
}
