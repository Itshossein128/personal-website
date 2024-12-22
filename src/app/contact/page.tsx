import Link from "next/link";
import { FaMap } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import ContactForm from "./components/ContactForm";

export default function Contact() {
  return (
    <main className="m-auto pb-6">
      <h3 className="text-center text-5xl md:text-6xl font-bold mb-16 xl:mb-24 mt-16 xl:mt-24">
        GET IN <span className="text-primary">TOUCH</span>
      </h3>
      <div className="grid md:grid-cols-[450px,auto] gap-10">
        <div>
          <span className="font-semibold text-2xl mb-4 block">
            Don&apos;t be shy!
          </span>
          <p className="mb-4">
            Feel free to get in touch with me. I am always open to discussing
            new projects, creative ideas or opportunities to be part of your
            visions.
          </p>
          <ul className="*:flex *:items-start *:gap-3 space-y-5">
            <li>
              <div className="shrink-0 text-primary">
                <FaMap className="w-full h-full" size={50} />
              </div>
              <div>
                <span className="text-slate-400 font-semibold">
                  Address Point
                </span>
                <br />
                <span>Iran, Shiraz, Fath-al-Mobin Street, Alley 46.</span>
              </div>
            </li>
            <li>
              <div className="shrink-0 text-primary">
                <FaEnvelope className="w-full h-full" size={50} />
              </div>
              <div>
                <span className="text-slate-400 font-semibold">mail me</span>
                <br />
                <span>
                  <Link href={"#"}>Itshossein128@gmail.com</Link>
                </span>
              </div>
            </li>
            <li>
              <div className="shrink-0 text-primary">
                <FaSquarePhone className="w-full h-full" size={50} />
              </div>
              <div>
                <span className="text-slate-400 font-semibold">call me</span>
                <br />
                <span>+989170745471</span>
              </div>
            </li>
          </ul>
          <div>
            <ul>
              <li>
                <Link href={"#"}>{/* <Image></Image> */}</Link>
              </li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
