import Image from "next/image";
import logo from "@/public/peopleshr-logo.webp";

// Official logo from peopleshr.com. The grey wordmark disappears on navy, so the footer
// version is turned white with a filter rather than shipping a second file.
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Image
      src={logo}
      alt="PeoplesHR"
      preload={!inverted}
      className={`h-[30px] w-[160px] ${inverted ? "brightness-0 invert" : ""}`}
    />
  );
}
