import { EPath } from "./path";
import { IRoute } from "@/types/route";

export const Route: IRoute[] = [
  {
    id: 1,
    icon: "/assets/icons/dashboard.svg",
    name: "SM_Sidebar_Dashboard",
    path: EPath.HOME,
  },
  {
    id: 2,
    icon: "/assets/icons/documents.svg",
    name: "SM_Sidebar_Documents",
    path: EPath.DOCUMENTS,
  },
  {
    id: 3,
    icon: "/assets/icons/images.svg",
    name: "SM_Sidebar_Images",
    path: EPath.IMAGES,
  },
  {
    id: 4,
    icon: "/assets/icons/videos.svg",
    name: "SM_Sidebar_Media",
    path: EPath.MEDIA,
  },
  {
    id: 5,
    icon: "/assets/icons/others.svg",
    name: "SM_Sidebar_Others",
    path: EPath.OTHERS,
  },
];
