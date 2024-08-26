import Link from "next/link";
import Logo from '@/components/svgs/logo/logo-sf.svg'

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
        className={`relative overflow-hidden md:overflow-visible
          flex justify-between items-start md:items-center px-4
          w-full rounded-2xl 
          border-0 border-primary-100
          transition-all duration-300
          `}
      >
          <div className="h-12 w-full flex items-center justify-between">
            <div className="flex items-center">
            <Logo className="h-10 w-10 me-4"/>
              <span className="text-2xl me-1 header-font cursor-default text-secondary">
                Sales<span className="font-bold">Folio</span>
              </span>
              </div>
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
