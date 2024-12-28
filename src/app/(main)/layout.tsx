import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import MobileSidebar from "./_components/Sidebar/MobileSidebar";
import { ILayoutProps } from "@/types/layout";

function MainLayout({ children }: ILayoutProps) {
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
