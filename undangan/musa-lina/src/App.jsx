import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import komponen-komponen
import Opening from "./components/Opening";
import Introduction from "./components/Introduction";
import Couple from "./components/Couple";
import Walimatul from "./components/Walimatul_Urs";
import Countdown from "./components/Countdown";
import Penutup from "./components/Penutup";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger); // 2. Register Plugin
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  // Animasi saat tombol Opening diklik
  useGSAP(
    () => {
      if (isOpen) {
        gsap.from(contentRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    },

    { dependencies: [isOpen] },
  );

  return (
    <main className=" min-h-screen bg-cream overflow-hidden ">
      {!isOpen ? (
        <Opening onOpen={() => setIsOpen(true)} />
      ) : (
        /* Pembungkus Utama Seluruh Section Undangan */
        <div ref={contentRef} className="w-full flex flex-col ">
          <Introduction />
          <Couple />
          <Walimatul />
          <Countdown />
          <Penutup />
          <Footer />
        </div>
      )}
    </main>
  );
}

export default App;
