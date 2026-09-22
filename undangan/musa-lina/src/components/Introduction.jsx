import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Backgroundtemplate from "./Background";
import background from "../Assets/Ornament/background.png";
import frame from "../Assets/Ornament/frame_2.png";
import backgroundVideo from "../Assets/Ornament/Video/background.mp4";

gsap.registerPlugin(ScrollTrigger);

function Introduction() {
  const introductionRef = useRef(null);
  const arabRef = useRef(null);
  const artiRef = useRef(null);

  useGSAP(
    () => {
      // Paksa hitung ulang posisi agar titik pemicu presisi
      ScrollTrigger.refresh();

      gsap.fromTo(
        introductionRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.2,
          ease: "circ.out",
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introductionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          markers: false,
          anticipatePin: 1,
        },
      });

      tl.to(arabRef.current, { opacity: 0, y: -50, duration: 1 }).from(
        artiRef.current,
        { opacity: 0, y: 50, duration: 1 },
      );
    },
    { scope: introductionRef },
  );
  return (
    <Backgroundtemplate
      ref={introductionRef}
      texture={background}
      video={backgroundVideo}
    >
      <section className="relative w-full h-full mx-auto">
        <div className="flex flex-col text-center justify-center ">
          <img
            src={frame}
            alt="frame"
            className="absolute top-[50%] left-[2%]"
          />
          <div
            ref={arabRef}
            className=" absolute
            top-[280px]
            left-13

            max-[420px]:top-[250px]
            max-[420px]:left-10

            max-[400px]:top-[250px]

            max-[380px]:top-[220px]

            max-[362px]:left-7"
          >
            <p className="font-arabic text-brown text-[clamp(1rem,8vw,2rem)]">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="font-arabic text-brown text-[clamp(1rem,8vw,2rem)] mx-auto leading-[1.6] w-[330px]  max-[400px]:w-[300px]  max-[400px]:text-[26px] max-[380px]">
              وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
              لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً
              وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
            </p>
          </div>
          <div
            ref={artiRef}
            className="absolute h-full flex  flex-col 
            top-[280px] 
            max-[430px]:top-[250px] 
            max-[420px]:top-[250px] 
            max-[400px]:top-[250px] 
            max-[380px]:top-[220px] 
            left-19 
            max-[430px]:left-16 
            max-[420px]:left-10 
            max-[400px]:left-5 
            max-[395px]:left-18 
            max-[365px]:left-15
            w-[300px]
            max-[420px]:w-[320px] 
            max-[400px]:w-[250px]
            max-[380px]:w-[240px]"
          >
            <p className="mb-2 font-display text-brown text-center text-[16px] max-[400px]:text-[12px]">
              Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
              pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu
              merasa tenteram kepadanya.
            </p>
            <p className="mb-2 font-display text-brown text-center text-[16px] max-[400px]:text-[12px]">
              Dia menjadikan di antaramu rasa cinta dan kasih sayang.{" "}
            </p>
            <p className="mb-5 font-display text-brown text-center text-[16px] max-[400px]:text-[12px]">
              Sesungguhnya pada yang demikian itu benar-benar terdapat
              tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
            </p>
            <p className="font-display text-brown text-center text-[16px] max-[400px]:text-[12px]">
              (Ar-Rum : 21)
            </p>
          </div>
        </div>
      </section>
    </Backgroundtemplate>
  );
}

export default Introduction;
