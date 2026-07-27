import { createContext, useContext, useState, ReactNode } from "react";
type Toast = { id: number; title?: string; description?: string; variant?: "default" | "destructive" };
const ToastCtx = createContext<{ toast: (t: Omit<Toast, "id">)=>void } | null>(null);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = (t: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter(x => x.id !== id)), 3000);
  };
  return (<ToastCtx.Provider value={{ toast }}>{children}
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map(t => (<div key={t.id} className={`rounded-xl border px-4 py-3 shadow ${t.variant==="destructive"?"border-destructive bg-destructive/10":"border-border bg-card"}`}>
        {t.title && <div className="font-medium mb-1">{t.title}</div>}
        {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
      </div>))}
    </div>
  </ToastCtx.Provider>);
}
export function useToast(){ const ctx = useContext(ToastCtx); if(!ctx) throw new Error("useToast must be used within ToastProvider"); return ctx; }
