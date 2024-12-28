import Image from "next/image";
import { getTranslations } from "next-intl/server";
// import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";

async function SignOutButton() {
  const t = await getTranslations("Sidebar");

  const handleSignOut = async () => {
    // "use server";
    // (await cookies()).delete("isLoggedIn");
  };

  return (
    <Button
      type="button"
      className="mobile-sign-out-button"
      onClick={handleSignOut}
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="logout"
        loading="eager"
        width={24}
        height={24}
      />
      {t("SM_Sidebar_Logout")}
    </Button>
  );
}

export default SignOutButton;
