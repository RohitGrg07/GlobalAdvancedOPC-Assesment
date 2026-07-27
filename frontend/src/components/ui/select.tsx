import { ReactNode } from "react";
export function Select({ children }: { children: ReactNode }) { return <div className="relative inline-block">{children}</div>; }
export function SelectTrigger({ children }: { children: ReactNode }) { return <button className="w-full rounded-xl border border-border bg-card px-3 py-2 text-left">{children}</button>; }
export function SelectValue() { return <span>Select…</span>; }
export function SelectContent({ children }: { children: ReactNode }) { return <div className="mt-2 rounded-xl border border-border bg-card p-2">{children}</div>; }
export function SelectItem({ value, onSelect, children }: { value: string; onSelect?: (v:string)=>void; children: ReactNode; }) { return <div onClick={()=>onSelect && onSelect(value)} className="px-3 py-1 rounded hover:bg-border/40 cursor-pointer">{children}</div>; }
