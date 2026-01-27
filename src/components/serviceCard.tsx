interface TechStackCardProps {
  number: string;
  title: string;
  imageUrl?: string;
  cardName?: string;
  imageClassName?: string;
  cardVariant?: string;
}

export const TechStackCard = ({
  number,
  title,
  imageUrl,
  imageClassName,
  cardVariant,
}: TechStackCardProps) => {
  return (
    <div
      className={`
        relative flex h-[300px] w-full md:w-[260px] flex-col justify-between 
        rounded-3xl border border-white/10 bg-[#0F111A]/90 
        p-6 backdrop-blur-xl transition-transform duration-300 
        hover:-translate-y-2 hover:border-[#9f92ff]/50 hover:shadow-2xl hover:shadow-cyan-600/20
        ${cardVariant}
      `}
    >
      {/* Card Number */}
      <div className="text-sm font-semibold text-gray-500 font-mono">{number}</div>

      {/* Icon Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className={`h-32 w-32 opacity-30 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 ${imageClassName}`}
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-white/5" />
        )}
      </div>

      {/* Title */}
      <div className="z-10 text-right">
        <span className="text-sm font-bold tracking-[0.2em] text-gray-300 uppercase">
          {title}
        </span>
      </div>
      
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-600/20 blur-2xl transition-all duration-500 hover:bg-purple-600/40" />
    </div>
  );
};