import React from "react";
import { Button } from "./ui/button";
import { Trash, Trash2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const Heading: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight ">{title}</h2>
      <p>{description}</p>
      
    </div>
  );
};

export default Heading;
