import Image from "next/image";

export default function Home() {
  return (
    <main className="home-main flex flex-col lg:flex-row items-center sm:justify-center lg:justify-between text-center lg:text-left py-10 gap-8 lg:gap-10 xl:gap-32 lg:pr-10 xl:pr-20">
      <Image
        alt=""
        src={"/avatar2.jpg"}
        width={700}
        height={700}
        className="aspect-square rounded-sm max-w-96 md:max-w-sm lg:max-w-lg xl:max-w-xl w-full shrink-0"
      />
      <div className="max-w-2xl">
        <div className="pl-10 mb-5">
          <span className="first-char-dash relative font-bold text-4xl text-primary inline-block mb-1">
            I'm Hossein Mehr.
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
      </div>
    </main>
  );
}
