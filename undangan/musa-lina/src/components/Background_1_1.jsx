import { forwardRef } from "react";

const Background_1_1 = forwardRef(function Background_1_1(
  { texture, children },
  ref,
) {
  return (
    <section ref={ref} className="background-page-square mt-[-10px]">
      <img
        src={texture}
        className="absolute inset-0 w-full h-full  object-cover"
      />
      <div className="relative z-20">{children}</div>
    </section>
  );
});

export default Background_1_1;
