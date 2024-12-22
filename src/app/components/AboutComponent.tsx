import { ReactNode } from "react";
import AnimatedButton from "./AnimatedButton";
import ExperienceCard from "./ExperienceCard";
import { HiDocumentDownload } from "react-icons/hi";

type Tprops = {
  className?: string;
  children?: ReactNode;
};

type Tskill = {
  title: string;
  items: string[];
};

type TExperience = {
  date: string;
  title: string;
  desc: string[];
};

const skills: Tskill[] = [
  {
    title: "Fundamental",
    items: ["HTML5", "CSS3"],
  },
  {
    title: "Languages",
    items: ["JavaScript (ES 2024)", "TypeScript"],
  },
  {
    title: "CSS Frameworks",
    items: ["Bootstrap", "Tailwind"],
  },
  {
    title: "CSS Preprocessor",
    items: ["Sass"],
  },
  {
    title: "JavaScript Libraries",
    items: ["React.Js", "JQuery"],
  },
  {
    title: "React Frameworks",
    items: ["Next.Js"],
  },
  {
    title: "Testing",
    items: ["Jest", "Vitest", "Cypress"],
  },
  {
    title: "Version Control System",
    items: ["Git", "GitHub", "GitLab"],
  },
  {
    title: "State Management",
    items: ["Zustand", "Redux", "Redux Toolkit"],
  },
  {
    title: "Deployment",
    items: ["Vercel"],
  },
];

const experiences: TExperience[] = [
  {
    date: "June 2020 - December 2020",
    title: "Pandol",
    desc: [
      "Design and implementation of responsive user interfaces for multiple websites using HTML, CSS, and JavaScript.",
      "Collaborated with design and development teams to create engaging and user-friendly interfaces.",
      "Optimized websites for better performance and enhanced user experience.",
    ],
  },
  {
    date: "December 2020 - March 2024",
    title: "PSCR",
    desc: [
      "Design and implementation of responsive user interfaces for multiple websites using HTML, CSS, and JavaScript.",
      "Utilized modern techniques to optimaize code.",
      "Development of React applications",
      "Collaboration with the design and development team to create an optimal and engaging user experience.",
    ],
  },
  {
    date: "March 2024 - July 2024",
    title: "Pitta",
    desc: [
      "Design and implementation of a responsive user interface for the e-commerce website and admin dashboard of the company using React.js.",
      "Collaboration with the design and development team to create an optimal and engaging user experience.",
    ],
  },
  {
    date: "October 2024 - Present",
    title: "Lamerd Cement",
    desc: [
      "Design and implementation of a responsive user interface for the company’s software project using Next.js.",
      "Utilized modern techniques and best practices to create clean and maintainable code.",
    ],
  },
];

export default function AboutComponent({ className, children }: Tprops) {
  return (
    <div className={className}>
      {children}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
        <div>
          <h3 className="text-3xl font-semibold mb-3">Personal Infos</h3>
          <div className="flex gap-10 *:flex *:flex-col leading-8 font-semibold">
            <div>
              <span>
                <span className="opacity-75 !font-normal">First Name</span>:
                Hossein
              </span>
              <span>
                <span className="opacity-75 !font-normal">Age</span>: 23 Years
              </span>
              <span>
                <span className="opacity-75 !font-normal">Freelance</span>:
                Available
              </span>
              <span>
                <span className="opacity-75 !font-normal">Phone</span>:
                +989170745471
              </span>
            </div>
            <div>
              <span>
                <span className="opacity-75 !font-normal">Last Name</span>:
                Akbari
              </span>
              <span>
                <span className="opacity-75 !font-normal">Nationality</span>:
                Iran
              </span>
              <span>
                <span className="opacity-75 !font-normal">Email</span>:
                itshossein128@gmail.com
              </span>
              <span>
                <span className="opacity-75 !font-normal">langages</span>:
                Persian, English
              </span>
            </div>
          </div>
          <AnimatedButton
            icon={
              <HiDocumentDownload style={{ width: "24px", height: "24px" }} />
            }
          >
            Download CV
          </AnimatedButton>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <ExperienceCard number={4} title="Years of Experience" />
          <ExperienceCard number={9} title="Completed Projects" />
          <ExperienceCard number={14} title="Happy Customers" />
          <ExperienceCard number={5} title="Years of Experience" />
        </div>
        <div className="lg:col-span-2">
          <h5 className="font-semibold text-2xl mb-3">Skills:</h5>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            {skills.map(({ title, items }) => {
              return (
                <li key={title}>
                  <h6 className="md:text-lg font-semibold">{title}:</h6>
                  <ul className="pl-6 flex flex-wrap whitespace-nowrap list-disc gap-x-12">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h5 className="font-semibold text-2xl mb-3">Experiences:</h5>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
            {experiences.map(({ title, date, desc }) => {
              return (
                <li key={date}>
                  <h6 className="md:text-lg font-semibold">{title}</h6>
                  <span className="opacity-60 text-sm">{date}</span>
                  <ul className="list-disc pl-6 space-y-2">
                    {desc.map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
