"use client";
import Image from "next/image";
import AboutButton from "../components/AboutButton";

export default function Home() {
  return (
    <main className="home-main flex flex-col lg:flex-row items-center sm:justify-center lg:justify-between text-center lg:text-left py-3 lg:py-10 gap-8 lg:gap-10 xl:gap-32 lg:pr-10 xl:pr-20">
      <div className="aspect-square rounded-sm sm:max-w-96 md:max-w-sm lg:max-w-lg xl:max-w-xl w-full shrink-0 overflow-hidden placeholder-animation relative">
        <Image
          alt=""
          src={"/avatar2.png"}
          width={700}
          height={700}
          priority={false}
          style={{ transform: "rotateY(180deg)" }}
        />
      </div>
      <div className="max-w-2xl">
        <div className="lg:pl-10 mb-5">
          <span className="first-char-dash relative font-bold text-4xl text-primary inline-block mb-1">
            I&apos;m Hossein Mehr.
          </span>
          <br />
          <span className="font-bold text-2xl">Front-End Developer</span>
        </div>
        <p className="text-lg">
          I am a front‑end developer passionate about building clean,
          responsive, and efficient web applications. I focus on writing
          high-quality code to bring user-friendly designs to life, ensuring
          seamless and accessible experiences for all users.
        </p>
        <AboutButton />
      </div>
    </main>
  );
}
