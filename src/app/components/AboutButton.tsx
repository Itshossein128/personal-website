"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AboutComponent from "./AboutComponent";
import { IoCloseCircleOutline } from "react-icons/io5";
import AnimatedButton from "./AnimatedButton";

export default function AboutButton() {
  const [showAboutComponent, setShowAboutComponent] = useState(false);

  return (
    <>
      <AnimatedButton
        onClick={() => setShowAboutComponent(true)}
        icon={<FaArrowRight style={{ width: "18px", height: "18px" }} />}
      >
        More About Me
      </AnimatedButton>
      {/* <button
        className={`border border-primary pl-5 rounded-full flex items-center justify-between gap-7 mt-8 relative overflow-hidden button-hover mx-auto lg:mx-0`}
      >
        More About Me
        <span className="rounded-full h-12 w-12 flex items-center justify-center bg-primary"></span>
      </button> */}
      <div
        className={`w-full h-[100vh] bg-black/60 fixed top-0 left-0 z-50 backdrop-blur-sm p-3 md:p-5 pb-0 ${
          showAboutComponent ? "" : "hidden"
        }`}
        onClick={() => {
          setShowAboutComponent(false);
        }}
      >
        <div
          className={`modal container max-w-5xl m-auto max-h-full overflow-auto ${
            showAboutComponent ? "show" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <AboutComponent
            className="container m-auto  border border-white/20 bg-slate-50 dark:bg-slate-950 p-5 rounded-sm text-left relative"
            children={
              <button
                className="absolute right-1 top-1 text-2xl"
                onClick={() => setShowAboutComponent(false)}
              >
                <IoCloseCircleOutline />
              </button>
            }
          />
        </div>
      </div>
    </>
  );
}
