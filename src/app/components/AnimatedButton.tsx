import { ReactElement } from "react";

type Tprops = {
  icon: ReactElement;
  children: string;
  onClick?: () => void;
};

export default function AnimatedButton({ icon, children, onClick }: Tprops) {
  return (
    <button
      onClick={onClick}
      className={`border border-primary pl-5 rounded-full flex items-center justify-between gap-7 mt-4 lg:mt-8 relative overflow-hidden button-hover z-50`}
    >
      {children}
      <span className="rounded-full h-12 w-12 flex items-center justify-center bg-primary">
        <span className="text-slate-50 dark:text-slate-950">{icon}</span>
      </span>
    </button>
  );
}
