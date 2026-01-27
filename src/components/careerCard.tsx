import React from "react";

export type CaseStudyCardProps = {
  href: string;
  indexFirst: string;
  indexSecond: string;
  title: string;
  description: React.ReactNode;
  tag1: string;
  tag2: string;
  imageUrl: string;
  imageSizes?: string;
  imageAlt?: string;
};

export const CaseStudyCard = ({
  href,
  indexFirst,
  indexSecond,
  title,
  description,
  tag1,
  tag2,
  imageUrl,
  imageSizes,
  imageAlt = "",
}: CaseStudyCardProps) => {
  const tags = [tag1, tag2];

  return (
    <a
      href={href}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#191C30] to-[#0B0E23] p-4 transition-all duration-300 hover:-translate-y-5 hover:border-[#4988C4] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:flex-row md:items-stretch md:gap-8 md:p-6"
    >
      {/* Hover Gradient Effect Layer */}
      <div className="absolute inset-0 z-0 bg-blue-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content Section */}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 py-2">
        {/* Header: Index & Title */}
        <div className="flex flex-col gap-4">
          <div className="font-plus_jakarta_sans_variable text-sm font-medium text-zinc-400 md:text-base">
            <span>[ </span>
            <span>{indexFirst}</span>
            <span>{indexSecond}</span>
            <span> ]</span>
          </div>
          
          <h3 className="font-plus_jakarta_sans text-xl font-bold leading-tight text-white md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-[48px]">
            {title}
          </h3>
        </div>

        {/* Body: Description & Tags */}
        <div className="flex flex-col gap-6">
          <div className="font-plus_jakarta_sans text-base leading-6 text-gray-400">
            {description}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-plus_jakarta_sans_variable text-sm text-zinc-300 backdrop-blur-sm transition-colors group-hover:border-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative z-10 mt-6 min-h-[200px] w-full shrink-0 overflow-hidden rounded-xl md:mt-0 md:w-[45%] lg:w-[50%]">
        <div className="h-full w-full">
          <img
            src={imageUrl}
            alt={imageAlt}
            sizes={
              imageSizes || "max((min(100vw, 1120px) - 112px) / 2, 1px)"
            }
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Inner Border for Image (Optional, matches design fidelity) */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/10" />
      </div>
    </a>
  );
};