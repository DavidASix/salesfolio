"use client";
import { useState, useRef } from "react";
import Alert from "@/components/Alert";
import Link from "next/link";

import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";

const outreachTypes = [
  { slug: "call", title: "Cold Call", icon: BsTelephone },
  { slug: "email", title: "Email", icon: BsEnvelopeAt },
  { slug: "creative", title: "Creative", icon: BsLightbulb },
];

export default function Outreach({ user, onError }) {
  const [newOutreachType, setNewOutreachType] = useState(outreachTypes[0].slug);

  const onChangeAudioFile = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return onError("warning", "Image Invalid");
    }
    if (file.size > 1024 * 1024 * 100) {
      return onError("warning", "Please choose a smaller image");
    }
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
    setImage(file);
  };

  const onImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return onError("warning", "Image Invalid");
    }
    if (file.size > 1024 * 1024 * 100) {
      return onError("warning", "Please choose a smaller image");
    }
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <section id="outreach" className="flex flex-col w-full gap-8 pb-20">
      <h2 className="header-font text-4xl">Outreach</h2>
        <p className="mb-4 font-extralight">
          Did you complete a killer cold call, write an amazing email, or have
          some creative outreach strategy? Brag about it here.
        </p>
        {/* Add new outreach card */}
        <div className="border bg-white rounded-3xl flex flex-col overflow-hidden w-full max-w-[7500px] self-center">
          <div className="bg-primary w-full h-min flex flex-col p-4">
            <h3 className="text-white header-font font-bold text-4xl">
              New outreach
            </h3>

            <p className="text-white">What would you like to record?</p>

            <div className="flex w-full px-8 justify-around h-10 gap-4 mt-4">
              {outreachTypes.map((type, i) => (
                <button
                  className={`btn flex-1 max-w-64 h-full whitespace-nowrap font-extralight text-xs md:text-[1rem] flex-nowrap gap-0 ${
                    newOutreachType === type.slug
                      ? "btn-accent md:font-bold"
                      : "text-base-dark"
                  }`}
                  onClick={() => setNewOutreachType(type.slug)}
                >
                  <type.icon className="hidden sm:block h-4 md:h-5 w-4 md:w-5 me-1" />
                  {type.title}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white w-full flex flex-col p-4 gap-8">
            <div>
              <label for="title" className="text-sm text-base-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder={`My Awesome ${
                  outreachTypes.find((v) => v.slug === newOutreachType).title
                } Outreach`}
                className="w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300"
              />
            </div>

            {/* SWITCHED OUTPUT CONTAINER BASED ON TYPE */}

            <div className="flex flex-col justify-center items-start px-2 md:px-8">
              {/* CALL OUTREACH INPUTS */}
              {newOutreachType === "call" && (
                <>
                  <label for="audio-url" className="text-sm text-base-700">
                    Audio URL
                  </label>
                  <input
                    type="url"
                    id="audio-url"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300"
                  />
                  <span className="self-center font-extralight mt-4">or</span>
                  <label for="video-url" className="text-sm text-base-700">
                    Video URL
                  </label>
                  <input
                    type="url"
                    id="video-url"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300"
                  />
                  <span className="self-center font-extralight mt-4">or</span>
                  <label for="audio-file" className="text-sm text-base-700">
                    Audio File Upload
                  </label>
                  <input
                    id="audio-file"
                    type="file"
                    className={`w-full rounded-2xl bg-white focus-visible:outline-none focus:shadow transition-all duration-300
                    file-input file-input-bordered file-input-info`}
                    accept="audio/*"
                    onChange={onChangeAudioFile}
                  />
                </>
              )}
              
              {/* EMAIL OUTREACH INPUTS */}
              {newOutreachType === "email" && (
                <>
                  <label for="subject" className="text-sm text-base-700">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder={`Hi there!`}
                    className="w-full rounded-2xl border-2 border-dashed border-base p-4 focus-visible:outline-none focus:shadow transition-all duration-300"
                  />

                  <label for="body" className="text-sm text-base-700">
                    Email Body
                  </label>
                  <textarea
                    className="w-full min-h-52 rounded-2xl border-2 border-dashed border-base p-4  focus-visible:outline-none focus:shadow transition-all duration-300"
                    placeholder={`Hey, this is my email,\n Nice to meet you!`}
                    id="body"
                    value=""
                  />
                </>
              )}
              
              {/* CREATIVE OUTREACH INPUTS */}
              {newOutreachType === "creative" && (
                <>
                <label for="image-file" className="text-sm text-base-700">
                  Image Upload
                </label>
                <input
                  id="image-file"
                  type="file"
                  className={`w-full rounded-2xl bg-white focus-visible:outline-none focus:shadow transition-all duration-300
                  file-input file-input-bordered file-input-info`}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onImageFileChange}
                />
                </>
              )}


            </div>

            <div>
              <label for="description" className="text-sm text-base-700">
                Description
              </label>
              <textarea
                className="w-full min-h-52 rounded-2xl border-2 border-dashed border-base p-4  focus-visible:outline-none focus:shadow transition-all duration-300"
                placeholder="This call is a great example of my etc etc etc"
                id="description"
                value=""
              />
            </div>
          </div>
        </div>
    </section>
  );
}
