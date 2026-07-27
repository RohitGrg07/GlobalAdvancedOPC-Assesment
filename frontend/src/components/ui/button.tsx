import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", className)} {...props} />;
}
