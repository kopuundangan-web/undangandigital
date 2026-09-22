import { forwardRef } from "react";

const Background = forwardRef(function Background(
  { texture, video, children },
  ref,
) {
  return (
    <section ref={ref} className="background-page bg-cream">
      <img
        src={texture}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full opacity-100 mix-blend-multiply object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="relative z-10">{children}</div>
    </section>
  );
});

export default Background;
