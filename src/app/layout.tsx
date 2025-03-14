import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "@/components/ThemeChanger";
import "./globals.css";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineWeb } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdChat } from "react-icons/md";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hossein Dev",
  description: "Hossein Akbari Mehr's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-3 md:grid grid-cols-[60px,auto,60px] pb-16 md:pb-0 bg-slate-50 dark:bg-slate-950`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="container xl:max-w-7xl mx-auto col-start-2 col-end-3">
            {children}
          </div>
          <div className="md:grid grid-rows-[1fr,auto,1fr] md:fixed md:top-3 md:right-3  md:h-dvh justify-end">
            <ThemeChanger />
            <nav className="md:row-start-2 md:row-end-3 md:block w-full py-3 px-3 md:px-0 bg-gray-900/80  backdrop-blur-lg backdrop-invert-[0.1] md:backdrop-blur-none md:backdrop-invert-0 md:bg-transparent fixed bottom-0 right-0 md:relative shadow-slate-900 dark:shadow-slate-300 shadow-[0_10px_18px_0] md:shadow-none z-50">
              <ul className="flex flex-row md:flex-col justify-between w-full items-center md:space-y-4 z-20 relative container m-auto">
                {[
                  {
                    title: "HOME",
                    href: "/",
                    icon: <MdHome size={20} />,
                  },
                  {
                    title: "ABOUT",
                    href: "/about",
                    icon: <IoMdPerson size={20} />,
                  },
                  {
                    title: "PORTFOLIO",
                    href: "/portfolio",
                    icon: <MdOutlineWeb size={20} />,
                  },
                  {
                    title: "CONTACT",
                    href: "/contact",
                    icon: <MdEmail size={20} />,
                  },
                  {
                    title: "BLOG",
                    href: "/blog",
                    icon: <MdChat size={20} />,
                  },
                ].map(({ title, href, icon }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      aria-label={title}
                      className="bg-slate-200 dark:bg-slate-800 text-slate-700 hover:text-slate-100 dark:text-slate-300 dark:hover:text-slate-900 w-10 h-10 transition rounded-full flex items-center justify-center relative align-middle hover:bg-primary nav-item-hover-container shadow-sm shadow-black md:shadow-none"
                    >
                      {icon}
                      <span className="absolute right-[0%] top-0 h-full hidden md:flex items-center pl-4 bg-slate-200 dark:bg-slate-800 rounded-full pr-2 text-slate-100 dark:text-slate-900">
                        {title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
