import React, { useState } from "react";
import axios from "axios";

export default function ProfilePicture({
  index,
  final,
  goNextStep,
  goBackStep,
  onError,
  user,
}) {
  const [input, setInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);

  const onPictureChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return onError("warning", "Image Invalid");
    }
    if (file.size > 1024 * 1024 * 2) {
      return onError("warning", "Please choose a smaller image");
    }

    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);

    setInput(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!input && !user?.image) {
        throw "Please upload an image";
      }
      // Users with an image provided from OAuth skip this validation
      if (input) {
        const formData = new FormData();
        formData.append("image", input);

        await axios.post("/api/user/uploadProfilePicture", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImgUploaded(true);
      }

      goNextStep();
    } catch (error) {
      console.log({ error });
      const msg =
        typeof error === "string"
          ? error
          : error?.message || error?.data?.message || "Something went wrong";
      onError("warning", msg);
    } finally {
      setTimeout(() => setLoading(() => false), 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full min-w-full snap-center snap-always
      flex flex-col justify-center items-center relative gap-y-16"
    >
      <div className="max-w-[800px] w-full flex-1 flex flex-col justify-center items-center gap-8">
        <div className="flex items-center gap-4 md:flex-row flex-col">
          <div className="h-48 w-48 bg-primary rounded-full flex justify-center items-center relative">
            <div className="h-48 w-48 bg-primary rounded-full absolute -left-1 -bottom-[2px] z-0" />
            <img
              src={imgPreview || user?.image || "/default-user.webp"}
              alt="Image Preview"
              className="h-auto w-auto object-cover rounded-full z-10"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <input
              type="file"
              className={`w-full max-w-xs transition-all duration-200 
            file-input file-input-bordered ${
              imgUploaded ? "file-input-success" : "file-input-info"
            }`}
              accept="image/png, image/gif, image/jpeg"
              onChange={onPictureChange}
            />
            <span className="h-10 w-10">
              <span
                className={`loading loading-dots loading-lg text-primary transition-all duration-300 ${
                  !loading ? "opacity-0" : ""
                }`}
              />
            </span>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl self-center text-center">
          {user?.image
            ? "You look great! Would you like to change your photo?"
            : "Let's start with a profile picture"}
        </h3>
      </div>

      <div className="w-full h-min flex justify-between p-4">
        <button
          type="button"
          className={`whitespace-nowrap w-min px-8 py-2 text-xl
            header-font btn btn-accent md:bottom-4 md:left-4`}
          onClick={goBackStep}
          disabled={!index}
        >
          👈️ Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`whitespace-nowrap w-min px-8 py-2 text-xl
        header-font btn ${final ? "btn-success" : "btn-primary"}
        md:bottom-4 md:right-4`}
        >
          {final ? "Submit 👍️" : "Next 👉️"}
        </button>
      </div>
    </form>
  );
}
