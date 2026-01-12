import { Inter } from "next/font/google";
import "@/app/styles/reset.css";
import "@/app/styles/globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="container">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
