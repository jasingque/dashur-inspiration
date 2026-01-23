export type TrustCardProps = {
  label: string;
  imageUrl: string;
  title: string;
  imageClassName?: string;
};

export const TrustCard = ({ label, imageUrl, title, imageClassName = "" }: TrustCardProps) => {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-[#191c30] to-[#0b0e23] p-6 transition-transform hover:-translate-y-1">
      
      {/* Label */}
      <p className="relative z-10 font-plus_jakarta_sans text-xs font-semibold tracking-wider text-zinc-400 uppercase">
        {label}
      </p>

      {/* Image Container */}
      <div className="absolute top-[15%] -right-[15%] w-[120%] h-[65%] z-0 pointer-events-none select-none">
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className={`h-full w-full object-contain object-center ${imageClassName}`}
        />
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-plus_jakarta_sans_variable text-2xl leading-tight text-white mt-[140px]">
        {title}
      </h3>
    </div>
  );
};