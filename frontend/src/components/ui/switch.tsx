interface Props { id?: string; checked: boolean; onCheckedChange: (checked: boolean) => void; }
export function Switch({ checked, onCheckedChange, id }: Props) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-slate-900" : "bg-slate-200"} relative`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}
