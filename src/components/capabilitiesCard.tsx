import { memo } from "react";

export type CapabilityItem = {
  id: number;
  title: string;
  imageUrl: string;
  label?: string;
};

export const TrustCard = memo(({ label, imageUrl, title }: Omit<CapabilityItem, "id">) => {
  return (
    <div className="group relative flex h-full w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-[#191c30] to-[#0b0e23] p-6 transition-transform hover:-translate-y-1">
      <p className="relative z-10 font-plus_jakarta_sans text-xs font-semibold tracking-wider text-zinc-400 uppercase">
        {label}
      </p>

      {/* Background Icon - Adjusted height/width and top position to make it smaller */}
      <div className="absolute top-[20%] -right-[15%] h-[50%] w-[100%] select-none opacity-50 transition-opacity group-hover:opacity-100">
        <img src={imageUrl} alt={title} className="h-full w-full object-contain" loading="lazy" decoding="async" />
      </div>

      <h3 className="relative z-10 mt-[140px] font-plus_jakarta_sans_variable text-2xl leading-tight text-white">
        {title}
      </h3>
    </div>
  );
});