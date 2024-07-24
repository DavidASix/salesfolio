"use client";
import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Alert from "@/components/Alert";

export default function Settings({ session }) {
  const [username, setUsername] = useState(session?.user?.username || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [location, setLocation] = useState(session?.user?.location || "");
  const [role, setRole] = useState(session?.user?.role || "");
  const [company, setCompany] = useState(session?.user?.company || "");
  const [firstSalesYear, setFirstSalesYear] = useState(
    session?.user?.firstSalesYear || ""
  );
  const [emailConsent, setEmailConsent] = useState(
    session?.user?.emailConsent || false
  );
  const [imgPreview, setImgPreview] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  async function saveChanges() {
    console.log('saveChanges called')
    if (!inputChangeDetected()) {
      console.log('No Change Detected')
      return;
    }

    try {
      setLoading(true);
      // Update username
      if (username && username !== session?.user?.username) {
        const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/g;
        if (!regex.test(username)) {
          throw "Username is invalid";
        }
        await axios.post("/api/user/setUsername", { username });
      }

      // Upload profile picture
      if (imgPreview) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post("/api/user/uploadProfilePicture", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImage(false);
        setImgPreview(false);
      }

      // Upload all other changed data
      const profileValues = {
        email,
        location,
        role,
        company,
        firstSalesYear,
        emailConsent,
      };
      for await (const key of Object.keys(profileValues)) {
        // Only upload values for things that have changed and have value
        if (profileValues[key] !== "" && profileValues[key] !== session?.user?.[key]) {
          await axios.post("/api/user/setValue", {
            key: key,
            value: profileValues[key],
          });
        }
      }

      router.refresh();
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message || err?.data?.message || "Something went wrong";
      alertRef.current.showAlert("warning", msg);
    } finally {
      setLoading(false);
    }
  }

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

    setImage(file);
  };

  function inputChangeDetected() {
    return !(
      username == session?.user?.username &&
      email == session?.user?.email &&
      location == session?.user?.location &&
      role == session?.user?.role &&
      company == session?.user?.company &&
      firstSalesYear == session?.user?.firstSalesYear &&
      emailConsent == session?.user?.emailConsent &&
      !imgPreview
    );
  }

  const alertRef = useRef(null);
  return (
    <>
      <Alert ref={alertRef} />
      <section className="section-padding min-h-screen -mt-16 pt-16 px-2">
        <div
          className="content-container min-h-full flex flex-col 
            bg-base-50 border-x border-base-200 px-4 pb-4
             rounded-t-3xl"
        >
          <div className="w-full flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center py-4 gap-4">
            <h1 className="header-font text-4xl whitespace-nowrap self-start order-2 sm:order-1">
              Account Settings
            </h1>
            <div className="flex items-center gap-4 self-end order-1 sm:order-2">
              <span className="h-10 w-10">
                <span
                  className={`loading loading-dots loading-lg text-primary transition-all duration-300 ${
                    !loading ? "opacity-0" : ""
                  }`}
                />
              </span>
              <button
                disabled={!inputChangeDetected()}
                className="btn btn-success h-10 sm:h-8 text-xl sm:text-lg"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center divide-y divide-base-50">
            {/* USERNAME */}
            <article className="w-full">
              <label
                htmlFor="handle"
                className="font-bold text-sm text-base-800"
              >
                Username
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>🔡</span>
                <input
                  type="text"
                  id="handle"
                  autoComplete="off"
                  maxLength={20}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary`}
                  placeholder="myName"
                />
              </div>
            </article>
            {/* PROFILE PICTURE */}
            <article className="w-full">
              <label
                htmlFor="image"
                className="font-bold text-sm text-base-800"
              >
                Profile Picture
              </label>
              <div className="w-full flex flex-col md:flex-row items-center gap-8 px-4 pb-3">
                <div className="h-32 w-32 bg-primary rounded-full flex justify-center items-center relative">
                  <div className="h-32 w-32 bg-primary rounded-full absolute -left-1 -bottom-[2px] z-0" />
                  <img
                    src={
                      imgPreview || session?.user?.image || "/default-user.webp"
                    }
                    alt="Image Preview"
                    className="h-full w-full object-cover rounded-full z-10"
                  />
                </div>
                <input
                  id="image"
                  type="file"
                  className={`w-full max-w-xs transition-all duration-200 
                    file-input file-input-bordered file-input-info`}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onPictureChange}
                />
              </div>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <hr className="w-full" />
              </div>
            </article>
            {/* EMAIL ADDRESS */}
            <article className="w-full">
              <label
                htmlFor="email"
                className="font-bold text-sm text-base-800"
              >
                Email
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>✉️</span>
                <input
                  disabled={session?.user?.email}
                  type="email"
                  id="email"
                  autoComplete="off"
                  maxLength={20}
                  value={(session?.user?.email ? "🔒️ " : "") + email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="myEmail@gmail.com"
                />
              </div>
            </article>
            {/* LOCATION */}
            <article className="w-full">
              <label
                htmlFor="location"
                className="font-bold text-sm text-base-800"
              >
                Location
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>📍</span>
                <input
                  type="text"
                  id="location"
                  autoComplete="off"
                  maxLength={20}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary`}
                  placeholder="Waterloo, Ontario"
                />
              </div>
            </article>
            {/* CURRENT ROLE */}
            <article className="w-full">
              <label htmlFor="role" className="font-bold text-sm text-base-800">
                Current Role
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>👔</span>
                <input
                  type="text"
                  id="role"
                  autoComplete="off"
                  maxLength={128}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary`}
                  placeholder="Sales Development Rep"
                />
              </div>
            </article>
            {/* CURRENT COMPANY */}
            <article className="w-full">
              <label
                htmlFor="company"
                className="font-bold text-sm text-base-800"
              >
                Current Company
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>🏢</span>
                <input
                  type="text"
                  id="company"
                  autoComplete="off"
                  maxLength={128}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary`}
                  placeholder="SalesFolio"
                />
              </div>
            </article>
            {/* FIRST YEAR IN SALES CAREER */}
            <article className="w-full">
              <label
                htmlFor="firstSalesYear"
                className="font-bold text-sm text-base-800"
              >
                First year in sales
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>🗓️</span>
                <input
                  type="number"
                  min="1920"
                  max={new Date().getFullYear()}
                  id="year"
                  maxLength={4}
                  value={firstSalesYear}
                  onChange={(e) =>
                    setFirstSalesYear(
                      parseInt(e.target.value.replace(/\D/g, ""))
                    )
                  }
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary`}
                  placeholder="2020"
                />
              </div>
            </article>

            {/* EMAIL CONSENT */}
            <article className="w-full">
              <label
                htmlFor="firstSalesYear"
                className="font-bold text-sm text-base-800"
              >
                Marketing email consent
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>📣</span>
                <span className={`bg-transparent text-lg flex-1 md:flex-0`}>
                  {emailConsent ? "Enabled" : "Disabled"}
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={emailConsent}
                  onChange={() => setEmailConsent(!emailConsent)}
                />
              </div>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <hr className="w-full" />
              </div>
            </article>
          </div>
          {/* SIGN OUT BUTTON */}
          <button
            type="button"
            className="btn btn-warning max-w-full w-80 self-center my-8"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </section>
    </>
  );
}
