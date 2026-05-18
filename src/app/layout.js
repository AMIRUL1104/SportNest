import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "SportNest",
  description: "Indoor Booking web app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}
