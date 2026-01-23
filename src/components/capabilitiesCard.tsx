export type TechStackCardProps = {
  cardName: string;
  number: string;
  imageUrl: string;
  imageClassName: string;
  title: string;
  cardVariant: string;
};

export const TechStackCard = (props: TechStackCardProps) => {
  return (
    <div
      className={`static box-content caret-black shrink h-auto w-auto z-auto md:absolute md:aspect-auto md:box-border md:caret-transparent md:shrink-0 md:h-[280px] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:w-[280px] md:z-[1] md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] ${props.cardVariant}`}
    >
      <div
        className="static [align-items:normal] box-content caret-black gap-x-[normal] block flex-row h-auto justify-normal gap-y-[normal] w-auto rounded-none md:relative md:content-center md:items-center md:aspect-auto md:box-border md:caret-transparent md:gap-x-0 md:flex md:flex-col md:h-full md:justify-center md:overscroll-x-auto md:overscroll-y-auto md:gap-y-0 md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:w-full md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:rounded-2xl"
      >
        <div className="static [align-items:normal] bg-none box-content caret-black gap-x-[normal] block basis-auto flex-row grow-0 shrink h-auto justify-normal min-h-0 min-w-0 gap-y-[normal] w-auto rounded-none md:relative md:content-center md:items-center md:aspect-auto md:bg-[linear-gradient(rgb(25,28,48)_0%,rgb(11,14,35)_100%)] md:box-border md:caret-transparent md:gap-x-2.5 md:flex md:basis-0 md:flex-col md:grow md:shrink-0 md:h-px md:justify-center md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:gap-y-2.5 md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:w-full md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:rounded-[15px] after:md:accent-auto after:md:box-border after:md:caret-transparent after:md:text-black after:md:block after:md:text-xs after:md:not-italic after:md:normal-nums after:md:font-normal after:md:h-full after:md:tracking-[normal] after:md:leading-[normal] after:md:list-outside after:md:list-disc after:md:pointer-events-none after:md:absolute after:md:text-start after:md:no-underline after:md:indent-[0px] after:md:normal-case after:md:visible after:md:w-full after:md:border after:md:rounded-[15px] after:md:border-separate after:md:border-solid after:md:border-white/20 after:md:left-0 after:md:top-0 after:md:font-sans_serif">
          <div className="static box-content caret-black block flex-row shrink justify-normal opacity-100 text-wrap z-auto left-auto top-auto md:absolute md:aspect-auto md:box-border md:caret-transparent md:flex md:flex-col md:shrink-0 md:justify-start md:opacity-20 md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:text-nowrap md:z-[1] md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:left-4 md:top-4">
            <p className="text-black text-base box-content caret-black leading-[normal] min-h-0 min-w-0 text-start text-wrap font-times md:text-white md:aspect-auto md:box-border md:caret-transparent md:leading-6 md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:text-center md:decoration-auto md:underline-offset-auto md:text-nowrap md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:font-plus_jakarta_sans_variable">
              {props.number}
            </p>
          </div>
          <div className="static box-content caret-black shrink h-auto min-h-0 min-w-0 w-auto md:relative md:aspect-auto md:box-border md:caret-transparent md:shrink-0 md:h-[88%] md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:w-[88%] md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto]">
            <div className="static box-content caret-black inset-auto md:absolute md:aspect-auto md:box-border md:caret-transparent md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:inset-0">
              <img
                sizes="calc(280px * 0.8786)"
                src={props.imageUrl}
                alt=""
                className={`box-content caret-black h-auto object-fill align-middle w-auto md:box-border md:caret-transparent md:h-full md:object-cover md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:align-baseline md:w-full md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] ${props.imageClassName}`}
              />
            </div>
          </div>
          <div className="static box-content caret-black block flex-row shrink justify-normal text-wrap z-auto right-auto bottom-auto md:absolute md:aspect-auto md:box-border md:caret-transparent md:flex md:flex-col md:shrink-0 md:justify-start md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:text-nowrap md:z-[1] md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:right-4 md:bottom-4">
            <h4 className="text-base font-bold box-content caret-black tracking-[normal] leading-[normal] min-h-0 min-w-0 text-start text-wrap font-times md:text-xl md:font-semibold md:aspect-auto md:box-border md:caret-transparent md:tracking-[-0.6px] md:leading-6 md:min-h-[auto] md:min-w-[auto] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:text-left md:decoration-auto md:underline-offset-auto md:text-nowrap md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto] md:font-plus_jakarta_sans">
              <span className="bg-clip-border bg-none box-content caret-black inline text-wrap md:aspect-auto md:bg-clip-text md:bg-[linear-gradient(2766deg,rgb(165,156,233)_0%,rgb(255,251,244)_66.5737%)] md:box-border md:caret-transparent md:inline-block md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:text-nowrap md:[mask-position:0%] md:bg-left-top md:-m-px md:p-px md:scroll-m-0 md:scroll-p-[auto]">
                {props.title}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};