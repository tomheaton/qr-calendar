import type { PropsWithChildren } from "react";
import Footer from "@/components/footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-white-ish">
      {children}
      <Footer />
    </div>
  );
}
