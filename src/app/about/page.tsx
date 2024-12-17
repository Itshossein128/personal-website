import AboutButton from "../components/AboutButton";
import AboutComponent from "../components/AboutComponent";

export default function Contact() {
  return (
    <main className="max-w-5xl m-auto pb-6">
      <h3 className="text-center text-5xl md:text-6xl font-bold mb-16 xl:mb-24 mt-16 xl:mt-24">
        ABOUT <span className="text-primary">ME </span>
      </h3>
      <AboutComponent />
    </main>
  );
}
