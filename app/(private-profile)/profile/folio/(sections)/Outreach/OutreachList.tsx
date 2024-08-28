"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AlertContext } from "@/components/AlertContext";
import OutreachItem from "./OutreachItem";
import formatClientError from "@/utils/client-error";

const pageSize = 2;

export default function OutreachList({ profile }) {
  const { showAlert } = useContext(AlertContext);
  const hasFetchedOnce = useRef(false);
  const [outreachList, setOutreachList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [outreachItemCount, setOutreachItemCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In strict mode, React calls useEffect twice on first render
    // This is done to highlight problems as regardless of times run the initialization
    // ... useEffect should only have an effect once.
    // To skip the second render, we use useRef to check if a render has been complete.
    if (!hasFetchedOnce.current) {
      getPage(currentPage);
      getOutreachItemCount();
      hasFetchedOnce.current = true;
    }
  }, []);

  useEffect(() => {
    if (loading && currentPage > 1) {
      getPage(currentPage);
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

  const getPage = async (page: number) => {
    try {
      const { data } = await axios.post("/api/outreach/getPage", {
        page,
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

  const onClickNextPage = async () => {
    if (outreachItemCount <= outreachList.length) {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    setCurrentPage((page) => page + 1);
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      {outreachList.map((outreach, i) => (
        <OutreachItem outreach={outreach} key={`${outreach.id}${i}`} />
      ))}
      {loading ? (
        <span className="loading loading-dots loading-lg text-primary"></span>
      ) : null}
      {outreachItemCount > outreachList.length ? 
      <button 
        className="btn btn-primary"
        disabled={loading}
        onClick={onClickNextPage}>
        Load More
      </button>
      : null
      }
    </div>
  );
}
