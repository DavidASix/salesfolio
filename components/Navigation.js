"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { title: "Home", url: "/" },
  { title: "Edit Profile", url: "/profile" },
  { title: "Public Profile", url: "/p" },
  { title: "David P Profile", url: "/p/davidasix" },
  { title: "Login", url: "/login" },
];

const NavLink = (props) => {
  const { link, currentPath } = props;
  const baseStyle = "text-base-900 hover:text-primary-800";
  const focusStyle = "text-primary-700 font-bold";
  if (link?.options) {
    return (
      <li className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className={`h-min ${
            link.options.map((l) => l.url).includes(currentPath)
              ? focusStyle
              : baseStyle
          }`}
        >
          {link.title}
        </div>
        <ul
          tabIndex={0}
          className="md:dropdown-content z-[1] md:menu md:p-2 
            md:shadow md:bg-base-100 md:rounded-box md:w-52 
            space-y-2 mt-2 md:space-y-0 md:mt-0"
        >
          {link.options.map((l, i) => (
            <li
              key={i}
              className={`ps-4 list-disc list-inside md:ps-0 md:list-none
              ${l.url === currentPath ? focusStyle : baseStyle}`}
            >
              <Link href={l.url}>{l.title}</Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li className="w-full h-min">
      <Link
        href={link.url}
        className={`flex justify-between transition-all duration-150 ${
          link.url === currentPath ? focusStyle : baseStyle
        }`}
      >
        <span className="my-auto text-inherit">{link.title}</span>
      </Link>
    </li>
  );
};

export default function Navigation({ session }) {
  const [expanded, setExpanded] = useState(false);
  const expandedStyle = expanded ? "h-40" : "h-12";

  const currentPath = usePathname();
  return (
    <>
      <div
        className="flex items-center justify-end px-3 md:px-3 py-2"
        aria-label="Main Menu"
      >
        <nav
          className={`${expandedStyle} relative overflow-hidden md:overflow-visible
            flex justify-between items-start md:items-center px-4
            w-full rounded-2xl bg-primary-50
            border border-primary-100
            transition-all duration-300
            `}
        >
          <div className="h-12 w-full flex items-center justify-between">
            <div className="flex w-full flex-row items-center space-y-4 md:space-y-0">
              <span className="text-2xl me-1 header-font cursor-default text-primary-800">
                Sales<span className="font-bold">Folio</span>
              </span>
              <div className="flex-1 flex justify-center items-center">
                <ul
                  className="w-full md:w-auto
                absolute top-12 start-0 flex flex-col space-y-2
                md:frosted md:rounded-full py-2 px-10
                md:relative md:top-auto md:start-auto md:flex-row md:space-y-0 md:space-x-10 md:justify-center"
                >
                  {links.map((link, i) => (
                    <NavLink key={i} link={link} currentPath={currentPath} />
                  ))}
                </ul>
              </div>
            </div>
            {session ? (
              <a href="/profile" className="h-10 w-10 flex justify-center items-center">
                <img
                  src={session?.user?.image || "/default-user.webp"}
                  className="rounded-full"
                />
              </a>
            ) : (
              <a
                href="/login"
                className="h-8 w-32 button button-outline-secondary"
              >
                Sign Up
              </a>
            )}

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex md:hidden w-14 h-14 items-center justify-center 
                rounded-lg"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5 stroke-primary-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 1h10M0 7h16M3 14h10"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
