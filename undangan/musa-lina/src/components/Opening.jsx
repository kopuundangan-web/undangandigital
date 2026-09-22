import { useEffect, useRef } from "react";
import gsap from "gsap";

import { SplitText } from "gsap/SplitText";
import Backgroundtemplate from "./Background";
import background from "../Assets/Ornament/background.png";
import frame from "../Assets/Ornament/frame_1.png";
import backgroundVideo from "../Assets/Ornament/Video/background.mp4";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

function Opening({ onOpen }) {
  const openingRef = useRef(null);
  const frameRef = useRef(null);
  const walimatulRef = useRef(null);
  const arabRef = useRef(null);
  const coupleRef = useRef(null);
  const guestRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const walimatul = SplitText.create(walimatulRef.current, {
      type: "chars",
    });
    const couple = SplitText.create(coupleRef.current, {
      type: "chars",
    });

    tl.from(frameRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power1.out",
    });

    tl.from(walimatul.chars, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "circ.out",
      stagger: 0.04,
    });
    tl.from(arabRef.current.children, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      scrub: true,
      stagger: 0.04,
      ease: "circ.out",
    });
    tl.from(couple.chars, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "circ.out",
      stagger: 0.04,
    });
  });

  const handleOpen = () => {
    gsap.to(openingRef.current, {
      opacity: 0,
      duration: 1.8,
      ease: "power2.inOut",

      onComplete: () => {
        onOpen();
      },
    });
    // cleanup
    return () => {
      split.revert();
    };
  };

  return (
    <Backgroundtemplate texture={background} video={backgroundVideo}>
      <section
        ref={openingRef}
        className="
      background-page
      "
      >
        <div
          className="
            flex flex-col text-center justify-center w-full h-full -translate-y-8"
        >
          <img
            ref={frameRef}
            src={frame}
            alt="frame"
            className="absolute w-[90%] left-5"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-[0.1px] leading-none -translate-y-9 ">
          <p
            ref={walimatulRef}
            className="absolute text-brown font-display text-title-lg mb-60 "
          >
            Walimatul 'Urs
          </p>
          <div ref={arabRef}>
            <h1 className="text-brown font-arabic text-title-xl">موسى</h1>
            <h1 className="text-brown font-arabic text-title-xl ">و</h1>
            <h1 className="text-brown font-arabic text-title-xl">لينا</h1>
          </div>
          <div ref={coupleRef}>
            <p className="text-brown font-display text-title-lg">
              Musa &amp; Lina
            </p>
            <p className="text-brown font-display text-body">
              Rabu, 28 Oktober 2026
            </p>
          </div>
        </div>
        <div
          className="
          guest-text  
          absolute
          bottom-15
          left-0
          z-50
           w-full
           text-center"
        >
          <p ref={guestRef} className="text-brown font-display">
            Kepada bapak/ibu tamu undangan
          </p>
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              font-display
              text-brown
            "
          >
            <span className="text-brown">|</span>

            <span>Nama Tamu</span>

            <span className="text-brown">|</span>
          </div>
          <button
            onClick={handleOpen}
            ref={buttonRef}
            className="btn-primary mt-5"
          >
            Buka Undangan
          </button>
        </div>
      </section>
    </Backgroundtemplate>
  );
}

export default Opening;
