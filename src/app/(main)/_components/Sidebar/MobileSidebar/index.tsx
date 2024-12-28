"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import NavItem from "../NavItem";
import FileUploader from "../../Header/FileUploader";
import SignOutButton from "@/components/common/SignOutButton";

function MobileSidebar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        loading="eager"
        width={120}
        height={52}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            loading="eager"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                alt="avatar"
                loading="eager"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div>
                <p className="text-start subtitle-2 capitalize">Nhan Nguyen</p>
                <p className="caption">nhannguyen2000jin@gmail.com</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <NavItem isMobile />

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col gap-5">
            <FileUploader />
            <SignOutButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSidebar;
