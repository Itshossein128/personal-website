"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AboutComponent from "./AboutComponent";
import { IoCloseCircleOutline } from "react-icons/io5";
import AnimatedButton from "./AnimatedButton";

export default function AboutButton() {
  const [showAboutComponent, setShowAboutComponent] = useState(false);

  const handleOpenModal = () => {
    setShowAboutComponent(true);
    const body = document.querySelector("body");
    if (body) body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowAboutComponent(false);
    const body = document.querySelector("body");
    if (body) body.style.overflow = "auto";
  };

  return (
    <>
      <AnimatedButton
        onClick={handleOpenModal}
        className="mx-auto"
        icon={<FaArrowRight style={{ width: "18px", height: "18px" }} />}
      >
        More About Me
      </AnimatedButton>

      <div
        className={`w-full h-[100vh] bg-black/60 fixed top-0 left-0 z-50 backdrop-blur-sm p-3 md:p-5 ${
          showAboutComponent ? "" : "hidden"
        }`}
        onClick={handleCloseModal}
      >
        <div
          className={`modal shadow-sm shadow-slate-700 container max-w-5xl m-auto max-h-full relative ${
            showAboutComponent ? "show" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-auto max-h-[calc(100vh-104px)] md:max-h-[calc(100vh-40px)]">
            <AboutComponent className="m-auto border-white/20 bg-slate-50 dark:bg-slate-950 p-5 rounded-sm text-left relative" />
          </div>
          <button
            className="absolute right-3 top-1 text-3xl bg-slate-50 dark:bg-slate-950 rounded-full"
            onClick={handleCloseModal}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
      </div>
    </>
  );
}
