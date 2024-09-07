"use client";
import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import emptyAnimation from "@/assets/lottie/empty.json";
import OutreachItem from "./OutreachItem";

export default function OutreachList({
  loadNextPage,
  entryList,
  loading,
  outreachItemCount,
  deleteItem,
}) {
  return (
    <div className="flex flex-col w-full items-center gap-8">
      {!loading && !entryList.length ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-2xl font-bold text-center">
            Sure is empty here
          </span>
          <figure className="h-64 w-64">
            <Lottie
              animationData={emptyAnimation}
              loop={true}
              autoplay={true}
              className="h-64 w-64"
            />
          </figure>
          <span className="text-2xl font-bold text-center">
            Share your first outreach above
          </span>
        </div>
      ) : null}
      {entryList.map((outreach, i) => (
        <OutreachItem 
          outreach={outreach} 
          onClickDelete={() => deleteItem(outreach._id)}
          key={`${outreach.id}${i}`} />
      ))}
      {loading ? (
        <span className="loading loading-dots loading-lg text-accent"></span>
      ) : (
        <span className="-mb-4 text-base-700 text-sm">{`${entryList.length} / ${outreachItemCount}`}</span>
      )}
      {outreachItemCount > entryList.length ? (
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={loadNextPage}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
}
