export type SolutionCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  className?: string; 
  aspectRatio?: string; 
};

export const SolutionCard = ({
  title,
  description,
  imageUrl,
  className = "",
  aspectRatio = "aspect-video"
}: SolutionCardProps) => {
  return (
    <div 
      className={`
        relative flex flex-col h-full w-full 
        overflow-hidden rounded-2xl 
        border border-white/10 bg-white/5 
        group hover:border-white/20 transition-colors duration-300
        ${className}
      `}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden ${aspectRatio}`}>
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] to-transparent opacity-80" />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-start p-6 gap-3">
        <h3 className="font-plus_jakarta_sans text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="font-plus_jakarta_sans text-sm leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};