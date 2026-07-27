type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
};

const sizes = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-11 h-11",
};

export function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/gg.jpeg"
        alt="logo"
        className={`${sizes[size]} rounded-lg object-cover`}
      />
      {showText && (
        <span className="text-lg font-semibold text-slate-900 tracking-tight">
          Global Advanced OPC
        </span>
      )}
    </div>
  );
}
