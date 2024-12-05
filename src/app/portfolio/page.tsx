"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPreview } from "react-icons/md";
import { FaCode } from "react-icons/fa";

interface TechItem {
  label: string;
  checked: boolean;
}

interface Techs {
  next: TechItem;
  bootstrap: TechItem;
  tailwind: TechItem;
  gulp: TechItem;
  typeScript: TechItem;
  vanilla: TechItem;
  jquery: TechItem;
}

const techs: Techs = {
  next: {
    label: "Next.Js",
    checked: false,
  },
  bootstrap: {
    label: "Bootstrap",
    checked: false,
  },
  tailwind: {
    label: "Tailwind",
    checked: false,
  },
  gulp: {
    label: "Gulp",
    checked: false,
  },
  typeScript: {
    label: "TypeScript",
    checked: false,
  },
  vanilla: {
    label: "Vanilla JS",
    checked: false,
  },
  jquery: {
    label: "JQuery",
    checked: false,
  },
};

export type Tportfolio = {
  title: string;
  imageUrl: string;
  id: number;
  href: string;
  repo: string | undefined;
  techs: string[];
};

const portfoliosData: Tportfolio[] = [
  {
    title: "My Personal Website",
    imageUrl: "/arena-skin.png",
    id: 1,
    href: "https://hossein-personal-website.vercel.app/",
    repo: "https://github.com/Itshossein128/personal-website",
    techs: [techs.next.label, techs.tailwind.label, techs.typeScript.label],
  },
  {
    title: "Arena Skin",
    imageUrl: "/arena-skin.png",
    id: 2,
    href: "https://arena.skin/",
    repo: undefined,
    techs: [techs.vanilla.label, techs.bootstrap.label, techs.gulp.label],
  },
  {
    title: "Rah Andaz",
    imageUrl: "/rahandaz.png",
    id: 3,
    href: "https://rahandaz.org",
    repo: undefined,
    techs: [techs.vanilla.label, techs.bootstrap.label, techs.gulp.label],
  },
  {
    title: "Bahare Salehnia",
    imageUrl: "/baharesalehnia.png",
    id: 4,
    href: "https://baharesalehnia.com/",
    repo: undefined,
    techs: [techs.jquery.label, techs.bootstrap.label, techs.gulp.label],
  },
];

export default function Portfolio() {
  const [tags, setTags] = useState(techs);
  const [portfolios, setPortfolios] = useState(portfoliosData);

  const handleTagClick = (label: string) => {
    setTags((prevTags) => {
      const newTags = { ...prevTags };
      for (const key in newTags) {
        if (newTags[key].label === label) {
          newTags[key] = { ...newTags[key], checked: !newTags[key].checked };
        }
      }

      // Get the list of checked tags
      const checkedTags = Object.values(newTags)
        .filter((tag) => tag.checked)
        .map((tag) => tag.label);

      // Filter portfolios based on checked tags
      if (checkedTags.length > 0) {
        setPortfolios(
          portfoliosData.filter((portfolio) =>
            checkedTags.every((tag) => portfolio.techs.includes(tag))
          )
        );
      } else {
        setPortfolios(portfoliosData);
      }

      return newTags;
    });
  };

  return (
    <main>
      <h3 className="text-center text-5xl md:text-6xl font-bold mb-16 xl:mb-24 mt-16 xl:mt-24">
        MY <span className="text-primary">PORTFOLIO</span>
      </h3>
      <ul className="flex items-center justify-center gap-2">
        {Object.entries(tags).map(([key, { label, checked }]) => (
          <li
            key={key}
            onClick={() => handleTagClick(label)}
            className={`px-3 py-1 border border-slate-400/40 rounded-full ${
              checked ? "bg-primary text-slate-700" : ""
            }`}
          >
            <button className="focus:outline-none">{label}</button>
          </li>
        ))}
      </ul>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 container m-auto mt-10">
        {portfolios.map(({ title, imageUrl, id, href, repo, techs }) => {
          return (
            <li key={id}>
              <div
                className="shadow-sm shadow-slate-400/70 border border-slate-200 dark:shadow-slate-400/35 dark:border-slate-800 rounded-md group block"
                onClick={() => window.open(href, "_blank")}
              >
                <div className="relative overflow-hidden rounded-tr-md rounded-tl-md pt-[56.25%] border-b border-slate-400/35">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={384}
                    height={216}
                    className="absolute left-0 top-0 w-full transition duration-200 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">{title}</h4>
                    <div className="flex items-center gap-3 my-2">
                      <a
                        href={href}
                        className="hover:text-primary transition"
                        target="_blank"
                      >
                        <MdPreview size={24} />
                      </a>
                      {repo && (
                        <a
                          href={repo}
                          className="hover:text-primary transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaCode size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    {techs.map((tech, index) => (
                      <span key={tech} className="">
                        {tech}
                        {index < techs.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
