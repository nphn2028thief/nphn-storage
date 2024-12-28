import Image from "next/image";

function Loading() {
  return (
    <div className="h-full flex justify-center items-center">
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

export default Loading;
