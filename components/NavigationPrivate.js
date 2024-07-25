import Link from "next/link";

export default function Navigation({ session }) {
  const links = [
    { title: "📁  My Folio", url: "/profile/folio" },
    { title: "⚙️  Settings", url: "/profile/settings" },
  ];

  return (
    <>
      <div
        className="flex items-center justify-end px-3 md:px-3 py-2"
        aria-label="Main Menu"
      >
        <nav
          className={`h-12 relative overflow-visible
            flex justify-between items-start md:items-center px-4
            w-full rounded-2xl 
            `}
        >
          <div className="h-12 w-full flex items-center justify-between">
            <span className="text-3xl me-1 header-font cursor-default text-primary-800">
              Sales<span className="font-bold">Folio</span>
            </span>
            <div className="dropdown md:dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <img
                  src={session?.user?.image || "/default-user.webp"}
                  className="rounded-full h-12 w-12"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-50 rounded-box z-[1] w-52 p-2 shadow-xl"
              >
                {links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
