import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ILayoutProps } from "@/types/layout";

async function AuthLayout({ children }: ILayoutProps) {
  const t = await getTranslations("AuthLayout");

  return (
    <div className="flex min-h-screen">
      <section className="max-w-[430px] w-1/2 xl:W-2/5 hidden lg:flex justify-center items-center bg-brand p-10">
        <div className="max-h-[800px] flex flex-col justify-center gap-12">
          <div>
            <Image
              src={"/assets/icons/logo-full.svg"}
              alt="logo"
              width={242}
              height={82}
              className="h-auto"
            />
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">{t("title")}</h1>
            <p className="body-1">{t("description")}</p>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={"/assets/images/files.png"}
              alt="files"
              width={220}
              height={220}
              className="transition-all hover:rotate-2 hover:scale-105"
            />
          </div>
        </div>
      </section>
      <section className="flex-1 flex flex-col lg:justify-center items-center bg-white px-4 py-10 lg:p-10 lg:py-0">
        <div className="lg:hidden mb-16">
          <Image
            src={"/assets/icons/logo-full-brand.svg"}
            alt="logo"
            width={242}
            height={82}
            className="h-auto"
          />
        </div>
        {children}
      </section>
    </div>
  );
}

export default AuthLayout;
