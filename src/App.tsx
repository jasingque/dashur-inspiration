import { HomePage } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const App = () => {
  return (
    <div className="text-black text-xs not-italic normal-nums font-normal accent-auto bg-slate-950 box-border caret-transparent block tracking-[normal] leading-[normal] list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-sans_serif">
      <div className="box-border caret-transparent">
        <div className="relative content-center items-center bg-slate-950 box-border caret-transparent gap-x-0 flex flex-col h-min justify-start min-h-[1000px] gap-y-0">
          <HomePage />
          <div className="box-border caret-transparent"></div>
          <div className="relative box-border caret-transparent grow h-0 w-0 bg-[position:0px_0px]"></div>
          <Navbar />
          <Footer />
        </div>
        <div className="box-border caret-transparent"></div>
      </div>
      <div className="absolute box-border caret-transparent h-0 w-0 z-0 overflow-hidden left-0 bottom-0">
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-14.svg"
          alt="Icon"
          className="box-border caret-transparent h-[18px] w-[18px]"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-15.svg"
          alt="Icon"
          className="box-border caret-transparent h-3 w-3"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-16.svg"
          alt="Icon"
          className="box-border caret-transparent h-3 w-3"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-17.svg"
          alt="Icon"
          className="box-border caret-transparent h-3 w-3"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-18.svg"
          alt="Icon"
          className="box-border caret-transparent h-[18px] w-[18px]"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-19.svg"
          alt="Icon"
          className="box-border caret-transparent h-4 w-4"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-20.svg"
          alt="Icon"
          className="box-border caret-transparent h-4 w-4"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-21.svg"
          alt="Icon"
          className="box-border caret-transparent h-[25px] w-[126px]"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-22.svg"
          alt="Icon"
          className="box-border caret-transparent"
        />
        <img
          src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/icon-23.svg"
          alt="Icon"
          className="box-border caret-transparent"
        />
      </div>
      <iframe
        src="https://framer.com/edit?framerSiteId=6031cdb054c242ad69a7dbeb2eb4ee0a486ede22984d45a4692918a71e3b9de4&source=bima.framer.media&features=%7B%22editorBarDisableFrameAncestorsSecurity%22%3Afalse%2C%22onPageLocalizationSupport%22%3Afalse%2C%22onPageMoveTool%22%3Afalse%7D&loadStart=1768577578537"
        className="fixed box-border caret-transparent hidden h-[1000px] w-screen z-[2147483647] left-0 top-0"
      ></iframe>
    </div>
  );
};