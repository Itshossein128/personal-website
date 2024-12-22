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
  desc: string;
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

export default function AboutComponent({ className, children }: Tprops) {
  return (
    <div className={className}>
      {children}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <h5 className="font-semibold text-xl mb-3">Skills:</h5>
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
      </div>
    </div>
  );
}
