import { Copy, Server, Terminal } from "lucide-react";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};
const ApiAlert: React.FC<Props> = ({ title, description, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied successfully!");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[.3rem] py-[.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button className="" variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
