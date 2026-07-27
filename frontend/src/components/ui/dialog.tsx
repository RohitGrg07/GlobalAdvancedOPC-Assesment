import { ReactNode } from "react";
type Props = { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode; };
export function Dialog({ open, onOpenChange, children }: Props) { if (!open) return null; return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => onOpenChange(false)} /><div className="relative z-10 w-full max-w-2xl">{children}</div></div>); }
export function DialogContent({ children, className }: { children: ReactNode; className?: string }) { return <div className={`rounded-xl border border-slate-200 bg-white shadow-xl ${className||""}`}>{children}</div>; }
export function DialogHeader({ children }: { children: ReactNode }) { return <div className="px-6 pt-6 pb-4 border-b border-slate-100">{children}</div>; }
export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) { return <h2 className={`text-xl font-semibold text-slate-900 ${className||""}`}>{children}</h2>; }
export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) { return <div className={`px-6 py-4 border-t border-slate-100 flex justify-end gap-2 ${className||""}`}>{children}</div>; }
