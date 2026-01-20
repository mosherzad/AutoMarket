"use client";
import Link from "next/link";
import { MdBlock, MdHideImage, MdViewAgenda } from "react-icons/md";
import { FaCar, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Overview",
      icon: <MdViewAgenda size={20} />,
    },
    { href: "/admin/users", label: "Users", icon: <FaUser size={20} /> },
    {
      href: "/admin/cars?pageNumber=1",
      label: "Cars",
      icon: <FaCar size={20} />,
    },
    {
      href: "/admin/users/blocked-user",
      label: "Blocked",
      icon: <MdBlock size={20} />,
    },
    {
      href: "/admin/cars/hidden-posts",
      label: "Hidden ",
      icon: <MdHideImage size={20} />,
    },
  ];
  return (
    <aside
      className="
    bg-white border rounded-lg
    w-full h-14
    md:h-140 md:w-20 md:hover:w-56
    transition-all duration-200
    group
  "
    >
      <nav
        className="
      flex flex-row md:flex-col
      items-center
      justify-around
      h-full
      px-2 md:px-3
      md:py-4
      md:space-y-15
    "
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
            flex items-center gap-2
            w-full
            rounded-md px-3 py-2
            font-semibold
            md:hover:bg-gray-100
            ${isActive ? "bg-gray-100" : "text-gray-700"}
          `}
            >
              <span className="text-red-600 shrink-0">{link.icon}</span>

              <span className="hidden md:inline opacity-0 group-hover:opacity-100 transition">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
