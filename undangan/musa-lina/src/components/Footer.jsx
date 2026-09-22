import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import background from "../Assets/Ornament/background.png";
import { AiFillInstagram } from "react-icons/ai";
import { TbBrandWhatsappFilled } from "react-icons/tb";

import Backgroundtemplate from "./Background_1_1";
function Footer() {
  return (
    <footer>
      <div className="w-[440px] h-[50px] p-3 mx-auto bg-brown">
        <div
          className="flex flex-rows 
        gap-45
        max-[380px]:gap-30 
        max-[400px]:gap-32
        max-[420px]:gap-38
        items-center 
        "
        >
          <p className="font-display text-cream">Made by Kopuundangan</p>
          <div className="flex flex-row gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 bg-cream rounded-lg text-2xl cursor-pointer text-brown">
              <AiFillInstagram />
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-cream rounded-lg text-2xl cursor-pointer text-brown">
              <TbBrandWhatsappFilled />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
