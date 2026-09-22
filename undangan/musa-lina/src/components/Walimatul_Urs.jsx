import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Backgroundtemplate from "./Background_1_1";

import frame from "../Assets/Ornament/frame_ujung.png";
import background from "../Assets/Ornament/background_4.png";

gsap.registerPlugin(ScrollTrigger, SplitText);
function Walimatul_Urs() {
  const walimatulRef = useRef(null);

  useGSAP(
    () => {
      const titleText = SplitText.create(".title-animation", {
        type: "words",
      });
      const leftText = SplitText.create(".left-text-animation", {
        type: "words",
      });
      const rightText = SplitText.create(".right-text-animation", {
        type: "words",
      });
      const bottomText = SplitText.create(".bottom-animation", {
        type: "words",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: walimatulRef.current,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(walimatulRef.current, {
        opacity: 0,
        duration: 1,
      });

      tl.from(titleText.words, {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.8,
        ease: "circ.out",
      });

      tl.from(
        leftText.words,
        {
          opacity: 0,
          x: -20,
          stagger: 0.04,
          duration: 0.8,
          ease: "circ.out",
        },
        "-=0.4",
      );

      tl.from(
        rightText.words,
        {
          opacity: 0,
          x: 20,
          stagger: 0.04,
          duration: 0.8,
          ease: "circ.out",
        },
        "-=0.6",
      );

      tl.from(
        bottomText.words,
        {
          opacity: 0,
          y: 20,
          stagger: 0.04,
          duration: 0.8,
          ease: "circ.out",
        },
        "-=0.4",
      );
    },
    { scope: walimatulRef },
  );
  return (
    <section className="relative w-full">
      <Backgroundtemplate texture={background}>
        <div ref={walimatulRef}>
          <div className="absolute left-5/13 translate-y-2/3 text-center">
            <p className="title-animation font-arabic text-[22px] text-gold">
              وَلِيمَةُ الْعُرْسِ
            </p>
            <p className="title-animation font-display text-cream">
              Walimatul Urs
            </p>
          </div>
          <img
            src={frame}
            alt="frame"
            className="absolute w-[90%] mt-10 left-1/19 object-contain"
          />
          <div
            className="grid grid-rows-[1fr,auto,1fr] 
        gap-10 
        max-[380px]:gap-5
        max-[400px]:gap-4
        p-13 
        translate-y-2/12
        max-[400px]:translate-y-2/10 "
          >
            <p className="left-text-animation text-cream font-display">
              26 Oktober 2026
            </p>
            <div className=" pl-5 grid grid-rows-[1fr,1fr] gap-2">
              <div className="grid gap-2 grid-cols-[60%_40%]  items-center">
                <p className="left-text-animation text-cream  border-r-2 border-cream font-display text-[clamp(1rem,5vh,1.6rem)]">
                  Akad
                </p>
                <p className="right-text-animation text-cream  text-[clamp(0.9rem,5vh,1.2rem)] font-display text-end">
                  10:00 WIT
                </p>
              </div>
              <div className="grid gap-2 grid-cols-[60%_40%]  items-center">
                <p className="left-text-animation text-cream  border-r-2 border-cream font-display text-[clamp(1rem,5vh,1.6rem)]">
                  Perjamuan
                </p>
                <p className="right-text-animation text-cream  text-[clamp(0.9rem,5vh,1.2rem)] font-display text-end">
                  12:00 WIT
                </p>
              </div>
            </div>

            <div>
              <p className="bottom-animation pl-1 mb-1 font-display text-cream">
                Gedung ACC Al-Akbar
              </p>
              <button className=" btn-primary">Buka di Google Maps</button>
            </div>
          </div>
        </div>
      </Backgroundtemplate>
    </section>
  );
}

export default Walimatul_Urs;
