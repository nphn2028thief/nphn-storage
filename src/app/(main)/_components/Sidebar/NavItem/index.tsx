"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "use-intl";

import { Route } from "@/constants/route";
import { cn } from "@/lib/utils";

interface IProps {
  isMobile?: boolean;
}

function NavItem({ isMobile = false }: IProps) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  return (
    <nav className={cn(isMobile ? "mobile-nav" : "sidebar-nav")}>
      <ul
        className={cn(
          isMobile ? "mobile-nav-list" : "flex-1 flex flex-col gap-6"
        )}
      >
        {Route.map(({ id, icon, name, path }) => (
          <Link key={id} href={path} className="lg:w-full">
            <li
              className={cn(
                isMobile ? "mobile-nav-item" : "sidebar-nav-item",
                pathname === path && "shad-active"
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className={cn(
                  "nav-icon",
                  pathname === path && "nav-icon-active"
                )}
              />
              <p className={cn(!isMobile && "hidden lg:block")}>{t(name)}</p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavItem;
