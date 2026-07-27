import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs", className)} {...props} />; }
