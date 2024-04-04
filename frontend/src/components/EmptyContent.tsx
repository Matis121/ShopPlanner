import React from "react";
import emptyState from "../assets/empty-state.svg";
import { Button } from "@/components/ui/button";

interface EmptyContentProps {
  paragraph: string;
  button: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ paragraph, button }) => {
  return (
    <section className="w-full">
      <div className="rounded-lg bg-white dark:bg-neutral-950 w-full flex flex-col items-center justify-center border shadow-md gap-12 py-12">
        <p className="font-semibold text-lg">{paragraph}</p>
        <img src={emptyState} alt="empty states" className="w-[300px]" />
        <Button>{button}</Button>
      </div>
    </section>
  );
};

export default EmptyContent;
