import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Backgroundtemplate from "./Background";

import frame from "../Assets/Ornament/frame_ujung.png";
import background from "../Assets/Ornament/background_4.png";
import WeddingCalender from "./WeddingCalender";
import WeddingCountdown from "./WeddingCountdown";

gsap.registerPlugin(ScrollTrigger);

function Countdown() {
  const countdownRef = useRef(null);
  const weddingRef = useRef(null);
  const countingRef = useRef(null);

  useGSAP(() => {});

  const tl = gsap.timeline({
    ScrollTrigger: {
      trigger: countdownRef.current,
      start: "top top",
      end: "bottom bottom",
      toggleActions: "play reverse play reverse",
      marker: true,
    },
  });

  tl.from(weddingRef.current, {
    opacity: 0,
    duration: 1,
    ease: "power1",
  });

  tl.from(countingRef.current, {
    opacity: 0,
    duration: 1,
    ease: "power1",
  });

  return (
    <section ref={countdownRef} className="relative">
      <Backgroundtemplate texture={background}>
        {/* SECTION KALENDER */}
        <img src={frame} className="absolute mt-10 w-[90%] left-3/50" />

        <div
          ref={weddingRef}
          className="absolute 
        scale-[0.9] 
        w-full 
        mx-auto 
        left-5/500
        translate-y-[-20px]
        
        max-[380px]:translate-y-[-32px]"
        >
          <WeddingCalender eventDate="2026-10-28" />
        </div>

        <div
          ref={countingRef}
          className="absolute w-full translate-y-50/15 scale-[0.9]"
        >
          <WeddingCountdown
            targetDate="2026-10-28T10:00:00+09:00"
            title="Walimatul Urs Musa & Nurlina"
            location="Gedung ACC Al-Akbar"
            description="Akad Nikah dan Walimatul Urs Musa & Nurlina"
          />
        </div>
      </Backgroundtemplate>
    </section>
  );
}

export default Countdown;
