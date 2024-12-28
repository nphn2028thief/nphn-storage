"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import NavItem from "./NavItem";
import { EPath } from "@/constants/path";
import { IGetMe } from "@/types/user";

function Sidebar() {
  const [user] = useState<IGetMe | null>(null);

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const res = await fetch(`${envConfig.apiUrl}/auth/getMe`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const user = (await res.json()) as IGetMe;
  //     setUser(user);
  //   };

  //   getCurrentUser();
  // }, []);

  return (
    <aside className="sidebar overscroll-none">
      <div className="pl-5 pr-3">
        <Link href={EPath.HOME}>
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            priority
            width={160}
            height={52}
            className="hidden lg:block"
          />
          <Image
            src="/assets/icons/logo-brand.svg"
            alt="logo"
            priority
            width={52}
            height={52}
            className="block lg:hidden"
          />
        </Link>
      </div>

      {/* Navigation menu */}
      <NavItem />

      <div className="sidebar-user-info">
        <Image
          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
          alt="avatar"
          loading="eager"
          width={40}
          height={40}
          className="sidebar-user-avatar"
        />
        <div className="flex-1 hidden lg:block">
          <p className="subtitle-2 capitalize line-clamp-1">
            {user?.data.fullName}
          </p>
          <p className="caption line-clamp-1">{user?.data.email}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
