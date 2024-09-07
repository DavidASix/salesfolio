"use client";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-wrap">
      <div className="flex-1 flex items-center justify-center bg-base-50 p-4 min-w-96 min-h-[50vh]">
        <img
          src="/cabinet.webp"
          className="object-contain rounded-3xl overflow-hidden max-h-[40vh]"
        />
      </div>

      <div className="flex-1 bg-transparent flex items-center justify-center min-w-96 min-h-[50vh]">
        <div className="w-full p-4 flex flex-col items-center">
          <h1 className="text-7xl header-font mb-6 text-center">404</h1>
          <h2 className="text-md font-semibold mb-6 text-base-700 text-center">
            We couldn&apos;t find the Folio you&apos;re looking for
          </h2>
          <Link href="/" className="btn btn-neutral">
            Try going to our homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
