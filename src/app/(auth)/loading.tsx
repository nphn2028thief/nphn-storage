import Image from "next/image";

function AuthLoading() {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        src="/assets/icons/loader-brand.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
    </div>
  );
}

export default AuthLoading;
