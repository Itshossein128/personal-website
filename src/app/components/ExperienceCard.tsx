type TProps = {
  number: number;
  title: string;
};
export default function ExperienceCard({ number, title }: TProps) {
  return (
    <div className="shadow-sm shadow-primary/30 border border-primary/20 flex flex-col rounded-md p-5">
      <div>
        <span className="text-primary text-5xl font-semibold relative">
          {number}
          <span className="absolute top-1 -right-5 text-3xl">+</span>
        </span>
      </div>
      <span className="dash-before">{title}</span>
    </div>
  );
}
