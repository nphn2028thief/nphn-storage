import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import MobileSidebar from "./_components/Sidebar/MobileSidebar";
import { EPath } from "@/constants/path";
import envConfig from "@/config/envConfig";
import { IGetMe } from "@/types/user";
import { ILayoutProps } from "@/types/layout";
import { fetchUtility } from "@/utils";

async function MainLayout({ children }: ILayoutProps) {
  const cookie = await cookies();

  if (cookie) {
    const options: RequestInit = {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookie.toString(),
      },
    };

    const res = await fetchUtility<IGetMe>(
      `${envConfig.apiUrl}/auth/getMe`,
      options
    );

    if (!res) {
      redirect(EPath.SIGNIN);
    }
  }

  return (
    <main className="h-full flex">
      <Sidebar />
      <section className="h-full flex-1 flex flex-col">
        <Header />
        <MobileSidebar />
        <div className="flex-1 flex mt-7 mb-5 mr-6 bg-light-400 sm:rounded-[30px] overflow-hidden">
          <div className="flex-1 mx-3 my-5 overflow-auto px-2">{children}</div>
        </div>
      </section>
    </main>
  );
}

export default MainLayout;
