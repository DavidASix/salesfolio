"use client";
import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsTelephone, BsEnvelopeAt, BsLightbulb } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import confettiAnimation from "@/assets/lottie/confetti.json";
import { AlertContext } from "@/components/AlertContext";

const outreachTypes = [
  { slug: "call", title: "Cold Call", icon: BsTelephone },
  { slug: "email", title: "Email", icon: BsEnvelopeAt },
  { slug: "creative", title: "Creative", icon: BsLightbulb },
];

const outreachSlugs = [...outreachTypes.map((v) => v.slug)] as const;
type OutreachTypes = (typeof outreachSlugs)[number];

export default function OutreachUpload({passOutreachToDisplay}) {
  const { showAlert } = useContext(AlertContext);
  const lottieRef = useRef(null);
  const [newOutreachType, setNewOutreachType] = useState<OutreachTypes>(null);
  const [description, setDescription] = useState<string>("");

  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [image, setImage] = useState<Blob>(null);
  const [audioFile, setAudioFile] = useState<Blob>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [showInputs, setShowInputs] = useState<boolean>(false);

  const audioInput = useRef(null);
  const imageInput = useRef(null);

  const outreachTypeClicked = (slug) => {
    setNewOutreachType(slug);
    setShowInputs(true);
  };

  const onChangeAudioFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) {
      return showAlert("warning", "Audio File Invalid");
    }
    if (file.size > 1024 * 1024 * 128) {
      return showAlert("warning", "Please choose a smaller audio file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setAudioFile(file);
  };

  const onChangeImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) {
      return showAlert("warning", "Image Invalid");
    }
    if (file.size > 1024 * 1024 * 10) {
      return showAlert("warning", "Please choose a smaller image");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setImage(file);
  };

  async function submitOutreach() {
    if (!description) {
      return showAlert("warning", "Please add a description");
    }
    setLoading(true);

    let audioFileUrl: URL;
    let imageUrl: URL;
    let headers = { "Content-Type": "multipart/form-data" };
    // UPLOAD FILES
    try {
      // AUDIO FILE FOR CALLS
      if (newOutreachType === "call") {
        // Upload call outreach. File is required for upload.
        if (!audioFile) {
          throw "Please select file";
        }

        const formData = new FormData();
        formData.append("audio", audioFile);

        const { data } = await axios.post(
          "/api/outreach/uploadAudioFile",
          formData,
          { headers }
        );
        audioFileUrl = data;
      }
      // IMAGE FILE FOR CREATIVE
      if (newOutreachType === "creative" && image) {
        // Upload image from creative. Image is not required in order to submit document
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post(
          "/api/outreach/uploadImage",
          formData,
          { headers }
        );

        imageUrl = data;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      return showAlert(
        "error",
        `Error uploading ${
          newOutreachType === "call" ? "audio" : "image"
        } file.`
      );
    }

    // Upload outreach document
    try {
      const possibleValues = {
        description,
        emailSubject,
        emailBody,
        imageUrl,
        audioFileUrl,
      };

      // Conditionally add values to send object to comply with SS type validation
      const newOutreachData = { type: newOutreachType };
      for (const [key, value] of Object.entries(possibleValues)) {
        value ? (newOutreachData[key] = value) : null;
      }

      const {data} = await axios.post("/api/outreach/uploadNewOutreach", newOutreachData);
      setDescription("");
      setEmailSubject("");
      setEmailBody("");
      setImage(null);
      setAudioFile(null);
      if (imageInput?.current) {
        imageInput.current.value = "";
      }
      if (audioInput?.current) {
        audioInput.current.value = "";
      }
      setShowInputs(false)
      setNewOutreachType(null)
      //showAlert("success", "Outreach Uploaded!");
      // Play confetti Animation
      lottieRef.current.setSpeed(0.5);
      lottieRef.current.goToAndPlay(0, true);
      // Return the new outreach to parent, for display in list
      passOutreachToDisplay(data)
    } catch (err) {
      console.log(err);
      showAlert(
        "warning",
        err?.response?.data || "An error occured, try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`relative overflow-hidden  border border-primary bg-white rounded-3xl flex flex-col w-full self-center
    transition-all duration-200 ${showInputs ? 'shadow-md' : ''}`}>
      <div
        className={`${
          loading ? "bg-base-500" : "bg-primary"
        } z-10 w-full h-min flex flex-col p-4 relative`}
      >
        {showInputs || newOutreachType ? (
          <motion.button
            className="absolute top-2 right-4"
            onClick={() => setShowInputs(!showInputs)}
            initial={{ rotate: '180deg' }}
            animate={{
              rotate: showInputs ? '0deg' : '180deg',
            }}
          >
              <FaChevronUp className="fill-base-50 h-8 w-8" />
          </motion.button>
        ) : null}
        <h3 className="text-white header-font font-bold text-4xl">
          Record outreach
        </h3>

        <p className="text-white">What would you like to share?</p>

        <div className="flex w-full px-8 justify-around h-10 gap-4 mt-4">
          {outreachTypes.map((type, i) => (
            <button
              disabled={loading}
              className={`btn flex-1 max-w-64 h-full whitespace-nowrap font-extralight text-xs md:text-[1rem] flex-nowrap gap-0 ${
                newOutreachType === type.slug
                  ? "btn-accent md:font-bold"
                  : "text-base-dark"
              }`}
              onClick={() => outreachTypeClicked(type.slug)}
              key={type.slug}
            >
              <type.icon className="hidden sm:block h-4 md:h-5 w-4 md:w-5 me-1" />
              {type.title}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: showInputs ? "auto" : 0,
          opacity: showInputs ? 1 : 0,
        }}
      >
        <div className="w-full flex flex-col gap-4 p-4">
          <div>
            <label htmlFor="description" className="text-sm text-base-700">
              Description
            </label>
            <textarea
              disabled={loading}
              maxLength={512}
              className="w-full min-h-32 rounded-2xl border-2 border-dashed border-base px-4 py-2  focus-visible:outline-none focus:shadow transition-all duration-300"
              placeholder="This call is a great example of my etc etc etc"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* SWITCHED OUTPUT CONTAINER BASED ON TYPE */}

          <div className="flex flex-col justify-center items-start px-2 md:px-8">
            {/* CALL OUTREACH INPUTS */}
            {newOutreachType === "call" && (
              <>
                <label htmlFor="audio-file" className="text-sm text-base-700">
                  Audio File Upload
                </label>
                <input
                  disabled={loading}
                  ref={audioInput}
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
                <label htmlFor="subject" className="text-sm text-base-700">
                  Subject Line
                </label>
                <input
                  disabled={loading}
                  type="text"
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder={`Hi there!`}
                  className="w-full rounded-2xl border-2 border-dashed border-base px-4 py-2 focus-visible:outline-none focus:shadow transition-all duration-300"
                />

                <label htmlFor="body" className="text-sm text-base-700">
                  Email Body
                </label>
                <textarea
                  disabled={loading}
                  className="w-full min-h-52 rounded-2xl border-2 border-dashed border-base px-4 py-2  focus-visible:outline-none focus:shadow transition-all duration-300"
                  placeholder={`Hi there,\n\nThis is my email, nice to meet you!`}
                  id="body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              </>
            )}

            {/* CREATIVE OUTREACH INPUTS */}
            {newOutreachType === "creative" && (
              <>
                <label htmlFor="image-file" className="text-sm text-base-700">
                  Image Upload
                </label>
                <input
                  disabled={loading}
                  ref={imageInput}
                  id="image-file"
                  type="file"
                  className={`w-full rounded-2xl bg-white focus-visible:outline-none focus:shadow transition-all duration-300
                  file-input file-input-bordered file-input-info`}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onChangeImageFile}
                />
              </>
            )}
          </div>
          <div className="flex justify-center">
            <button
              disabled={loading}
              type="button"
              onClick={submitOutreach}
              className={`h-10 btn flex-1 max-w-64 whitespace-nowrap font-extralight text-xs md:text-[1rem] 
            flex-nowrap gap-0 btn-accent md:font-bold`}
            >
              Submit
            </button>
          </div>
        </div>
      </motion.div>

      <figure title="confetti animation" className="z-50 top-0 absolute h-full pointer-events-none">
        <Lottie
          animationData={confettiAnimation}
          lottieRef={lottieRef}
          loop={false}
          autoplay={false} />
      </figure>
    </div>
  );
}
