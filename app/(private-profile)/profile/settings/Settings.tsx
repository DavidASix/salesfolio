"use client";
import { useState, useContext } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BsLinkedin, BsTwitterX, BsGlobe } from "react-icons/bs";

import { AlertContext } from "@/components/AlertContext";
import regex from "@/utils/regex";
import formatClientError from "@/utils/client-error";

export default function Settings({ profile, user }) {
  const { showAlert } = useContext(AlertContext);

  const [username, setUsername] = useState<string>(profile?.username || "");
  const [publicEmail, setPublicEmail] = useState<string>(
    profile?.publicEmail || ""
  );
  const [publicPhone, setPublicPhone] = useState<string>(
    profile?.publicPhone || ""
  );
  const [location, setLocation] = useState<string>(profile?.location || "");
  const [role, setRole] = useState<string>(profile?.role || "");
  const [company, setCompany] = useState<string>(profile?.company || "");
  const [firstSalesYear, setFirstSalesYear] = useState<string | number>(
    profile?.firstSalesYear || ""
  );
  const [emailConsent, setEmailConsent] = useState<boolean>(
    profile?.emailConsent || false
  );
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer>(null);
  const [image, setImage] = useState<Blob>(null);
  const [linkedinUrl, setLinkedinUrl] = useState<string>(
    profile?.linkedinUrl || ""
  );
  const [website, setWebsiteUrl] = useState<string>(profile?.website || "");
  const [twitter, setTwitter] = useState<string>(profile?.twitter || "");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function saveChanges() {
    if (!inputChangeDetected()) {
      return;
    }

    try {
      setLoading(true);

      // Upload profile picture
      if (imgPreview) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post("/api/user/uploadProfilePicture", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImage(null);
        setImgPreview(null);
      }

      // Validate Username
      if (username && username !== profile?.username) {
        if (!regex.username.test(username)) {
          throw "Username is invalid";
        }
      }

      // Upload all other changed data
      const profileValues = {
        username,
        publicEmail,
        location,
        role,
        company,
        firstSalesYear,
        emailConsent,
        publicPhone,
        linkedinUrl,
        website,
        twitter,
      };

      for await (const key of Object.keys(profileValues)) {
        // Only upload values for things that have changed and have value
        if (
          profileValues[key] !== "" &&
          profileValues[key] !== profile?.[key]
        ) {
          await axios.post("/api/user/setValue", {
            key: key,
            value: profileValues[key],
          });
        }
      }

      router.refresh();
    } catch (err) {
      const { message } = formatClientError(err);
      showAlert("warning", message);
    } finally {
      setLoading(false);
    }
  }

  const onPictureChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return showAlert("warning", "Image Invalid");
    }
    if (file.size > 1024 * 1024 * 2) {
      return showAlert("warning", "Please choose a smaller image");
    }

    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);

    setImage(file);
  };

  function inputChangeDetected() {
    return !(
      username == (profile?.username || "") &&
      publicEmail == (profile?.publicEmail || "") &&
      location == (profile?.location || "") &&
      role == (profile?.role || "") &&
      company == (profile?.company || "") &&
      firstSalesYear == (profile?.firstSalesYear || "") &&
      emailConsent == (profile?.emailConsent || "") &&
      publicPhone == (profile?.publicPhone || "") &&
      linkedinUrl == (profile?.linkedinUrl || "") &&
      website == (profile?.website || "") &&
      twitter == (profile?.twitter || "") &&
      !imgPreview
    );
  }

  return (
    <>
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
            <h2 className="header-font text-2xl self-start mt-4 mb-2 -ms-1">
              Profile
            </h2>
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
                    src={imgPreview || profile?.image || "/default-user.webp"}
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

            <h2 className="header-font text-2xl self-start mt-4 mb-2 -ms-1">
              Socials
            </h2>
            {/* EMAIL ADDRESS */}
            <article className="w-full">
              <label
                htmlFor="email"
                className="font-bold text-sm text-base-800"
              >
                Public Email
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>✉️</span>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  maxLength={128}
                  value={publicEmail}
                  onChange={(e) => setPublicEmail(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="myEmail@gmail.com"
                />
              </div>
            </article>

            {/* PUBLIC PHONE NUMBER */}
            <article className="w-full">
              <label
                htmlFor="phone"
                className="font-bold text-sm text-base-800"
              >
                Public Phone Number
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>📞</span>
                <input
                  type="tel"
                  id="phone"
                  maxLength={15}
                  value={publicPhone}
                  onChange={(e) => setPublicPhone(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="416-000-0000"
                />
              </div>
            </article>

            {/* Linkedin */}
            <article className="w-full">
              <label
                htmlFor="linkedin"
                className="font-bold text-sm text-base-800"
              >
                Linkedin URL
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <BsLinkedin className="fill-blue-500 h-4 w-4" />
                <input
                  type="url"
                  id="linkedin"
                  autoComplete="off"
                  maxLength={256}
                  minLength={25}
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="https://linkedin.com/in/salesfolio"
                />
              </div>
            </article>

            {/* X (twitter) */}
            <article className="w-full">
              <label
                htmlFor="twitter"
                className="font-bold text-sm text-base-800"
              >
                X (Twitter) Handle
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <BsTwitterX className="fill-black h-4 w-4" />
                <input
                  type="text"
                  id="twitter"
                  autoComplete="off"
                  maxLength={256}
                  minLength={2}
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="myTwitterHandle"
                />
              </div>
            </article>

            {/* PERSONAL WEBSITE */}
            <article className="w-full">
              <label
                htmlFor="website"
                className="font-bold text-sm text-base-800"
              >
                Personal Website
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <BsGlobe className="fill-primary-900 h-4 w-4" />
                <input
                  type="url"
                  id="website"
                  autoComplete="off"
                  maxLength={256}
                  minLength={25}
                  value={website}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="https://mysite.com"
                />
              </div>
            </article>

            <h2 className="header-font text-2xl self-start mt-4 mb-2 -ms-1">
              Settings
            </h2>
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
          {/* EMAIL ADDRESS */}
          {user?.email ? (
            <article className="w-full">
              <label
                htmlFor="email"
                className="font-bold text-sm text-base-800"
              >
                Account Email
              </label>
              <div className="w-full flex items-center gap-4 px-4 pb-3">
                <span>✉️</span>
                <input
                  disabled={true}
                  type="email"
                  id="email"
                  autoComplete="off"
                  maxLength={128}
                  value={`🔒️ ${user?.email}`}
                  className={`focus-visible:outline-none bg-transparent text-lg flex-1 border-b border-base-200 focus-visible:border-primary
                disabled:text-base-800`}
                  placeholder="myEmail@gmail.com"
                />
              </div>
            </article>
          ) : null}
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
