import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Backgroundtemplate from "./Background";

import dekorasiBunga from "../Assets/Ornament/flowers_frame_top.png";
import frame from "../Assets/Ornament/frame_1.png";
import frameDua from "../Assets/Ornament/frame_ujung.png";
import background from "../Assets/Ornament/background_4.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Couple() {
  const coupleRef = useRef(null);
  const salamRef = useRef(null);

  const nameCoupleRef = useRef(null);
  const frameRef = useRef(null);

  useGSAP(
    () => {
      // =========================
      // PEMBUKA
      // =========================
      const pembukaText = SplitText.create(".animationText", {
        type: "words",
      });
      const coupleText = SplitText.create(".couple-animate", {
        type: "words",
      });

      const tls = gsap.timeline({
        scrollTrigger: {
          trigger: salamRef.current,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play reverse play reverse",
        },
      });

      tls.from(salamRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "circ.in",
      });

      tls.from(pembukaText.words, {
        opacity: 0,
        x: 50,
        stagger: 0.04,
        duration: 1,
        ease: "circ.out",
      });

      const tln = gsap.timeline({
        scrollTrigger: {
          trigger: nameCoupleRef.current,
          start: "100px center",
          end: "300px 5%",
          markers: false,
          toggleActions: "play reverse play reverse",
        },
      });
      tln.from(nameCoupleRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.9,
        ease: "circ.in",
      });

      tln.from(coupleText.words, {
        opacity: 0,
        x: 50,
        stagger: 0.04,
        duration: 1.5,
        ease: "circ.out",
      });
    },
    { scope: coupleRef },
  );
  return (
    <section ref={coupleRef} className="relative">
      {/* BUNGA */}
      <div
        className="
          absolute
          z-10
          top-[-16rem]
          left-1/2
          -translate-x-1/2
          w-full
          max-w-[440px]
          h-[500px]
          bg-no-repeat
          bg-contain
          bg-center
          pointer-events-none
        "
        style={{
          backgroundImage: `url(${dekorasiBunga})`,
        }}
      />

      {/* BACKGROUND COUPLE */}
      <div className="relative z-20">
        <Backgroundtemplate texture={background}>
          <div
            ref={salamRef}
            className="flex flex-col w-full w-[256px] justify-center p-[30px] gap-1 mt-10"
          >
            <p className="text-center text-[22px] text-gold font-arabic">
              السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>

            <p className="animationText text-center text-[16px] max-[400px]:text-[12px] text-cream font-display mt-1 mb-5">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </p>

            <p className="animationText text-center text-[16px] max-[400px]:text-[12px] text-cream font-display">
              Atas Rahmat dan Ridho Allah SWT, dengan penuh sukacita kami
              mengundang Bapak/Ibu/Saudara/i sekalian untuk turut hadir
              menyaksikan momen sakral pernikahan kami.
            </p>
          </div>
          <div ref={nameCoupleRef} className="relative">
            <img
              ref={frameRef}
              src={frame}
              alt="frame"
              className="couple-animate absolute w-[95%]
               top-[-140px]
               max-[420px]:top-[-120px] 
               
               left-1/20"
            />
            <div
              className="absolute text-center 
            top-25 
            max-[380px]:top-20
            max-[420px]:top-22

            left-3/11

            max-[400px]:left-3/10
            max-[420px]:left-3/12"
            >
              <h1 className="font-arabic text-4xl text-cream">موسى سعيدان</h1>
              <p className="couple-animate font-display text-2xl text-cream">
                Musa saidan
              </p>
              <p className="couple-animate font-display text-[12px] max-[400px]:text-[8px] text-cream">
                Putra dari La Irade(Alm) dan Wa Loto(Alm)
              </p>
              <span className="font-arabic text-4xl text-cream">و</span>
              <h1 className="font-arabic text-4xl text-cream">نورلينا</h1>
              <p className="couple-animate font-display text-2xl text-cream">
                Nurlina
              </p>
              <p className="couple-animate font-display text-[12px] max-[400px]:text-[8px] text-cream">
                Putri dari La Renti(Alm) dan Ernawati
              </p>
            </div>
          </div>
        </Backgroundtemplate>
      </div>
    </section>
  );
}
export default Couple;
