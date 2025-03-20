import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container h-full", className)}>{children}</div>;
}
