import { ReactNode } from "react";
// import Footer from "./_components/footer";
// import { Navbar } from "./_components/Navbar-5";
import PageWrapper from "./_components/page-wrapper";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <Navbar /> */}
      <PageWrapper>
        <main className="mx-auto">{children}</main>
      </PageWrapper>
      {/* <Footer /> */}
    </div>
  );
}
