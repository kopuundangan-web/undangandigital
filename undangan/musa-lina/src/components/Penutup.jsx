import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Backgroundtemplate from "./Background";
import backgroundVideo from "../Assets/Ornament/Video/background.mp4";
import frame from "../Assets/Ornament/frame_ujung.png";
import background from "../Assets/Ornament/background.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Penutup() {
  const penutupRef = useRef(null);

  useGSAP(() => {
    const textAnimation = SplitText.create(".text-animation", {
      type: "words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: penutupRef.current,
        start: "-200px top",
        end: "800px bottom",
        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    tl.from(penutupRef.current, {
      opacity: 0,
      duration: 1,
      ease: "circ",
    });

    tl.from(textAnimation.words, {
      opacity: 0,
      x: 50,
      stagger: 0.04,
      duration: 0.4,
      ease: "circ",
    });
  });
  return (
    <Backgroundtemplate texture={background} video={backgroundVideo}>
      <section ref={penutupRef} className="relative">
        <div className=" absolute translate-y-1/15 translate-x-1/16 w-[90%] ">
          <div
            className="absolute text-center max-w-[350px]
           translate-y-6/30 
           max-[400px]:translate-y-6/50
           max-[420px]:translate-y-6/55
           max-[430px]:translate-y-6/40
           translate-x-1/16
           max-[400px]:translate-x-1/200
           max-[420px]:left-[-10px]"
          >
            <h1 className="text-animation font-display  text-brown text-2xl mb-10">
              Doa untuk Pasangan
            </h1>
            <h2 className="font-arabic text-brown text-[clamp(28px,9vw,36px)] mb-4">
              بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي
              خَيْرٍ
            </h2>
            <p className="text-animation font-display text-brown">
              Semoga Allah memberkahimu dan senantiasa memberkahimu (di kala
              mudharat/susah); dan mengumpulkan kalian berdua dalam kebaikan
            </p>
          </div>
          <img src={frame} />
        </div>

        <div
          className="absolute flex flex-col text-center 
          translate-y-15/8
          max-[380px]:translate-y-14/9

          left-2/13
          max-[400px]:left-2/23
          max-[420px]:left-2/15"
        >
          <p className="text-animation font-display text-brown  w-[300px] ">
            Dengan penuh syukur, kami mengharapkan kehadiran dan doa restu
            Bapak/Ibu/Saudara/i untuk keberkahan kedua mempelai
          </p>
          <div>
            <p className="font-arabic text-brown text-3xl mt-4">
              وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>
            <p className="text-animation font-display text-brown">
              Wassalamu’alaikum Warahmatullahi Wabarakatuh
            </p>
          </div>
          <div className="text-animation font-display text-brown mt-8">
            <p>Kami yang berbahagia</p>
            <p>Musa Saidan &amp; Nurlina </p>
          </div>
        </div>
      </section>
    </Backgroundtemplate>
  );
}

export default Penutup;
