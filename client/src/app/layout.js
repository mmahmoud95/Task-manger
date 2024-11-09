import localFont from "next/font/local";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Task Manger",
  description: "Task Manger App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><ToastContainer theme="colored" position="top-right" autoClose={1500} />    <Header />

        {children}
      </body>
    </html>
  );
}
