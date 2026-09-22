import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const namaHari = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function WeddingCalender({ eventDate = "2026-10-28" }) {
  const calendarRef = useRef(null);

  const selectedDate = new Date(`${eventDate}T00:00:00`);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const selectedDay = selectedDate.getDate();

  // Jumlah hari bulan sekarang
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Hari pertama bulan
  const firstDay = new Date(year, month, 1).getDay();

  // Konversi agar Senin = index pertama
  const startOffset = (firstDay + 6) % 7;

  // Jumlah hari bulan sebelumnya
  const previousMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Selalu buat 42 cell = 6 minggu
  for (let i = 0; i < 42; i++) {
    const dayNumber = i - startOffset + 1;

    if (dayNumber < 1) {
      calendarDays.push({
        day: previousMonthDays + dayNumber,
        currentMonth: false,
      });
    } else if (dayNumber > totalDays) {
      calendarDays.push({
        day: dayNumber - totalDays,
        currentMonth: false,
      });
    } else {
      calendarDays.push({
        day: dayNumber,
        currentMonth: true,
      });
    }
  }

  useGSAP(
    () => {
      gsap.from(".calendar-title", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".calendar-day", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: "power2.out",
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 80%",
        },
      });
    },
    {
      scope: calendarRef,
    },
  );

  return (
    <section
      ref={calendarRef}
      className="
        w-full
        max-w-[440px]
        mx-auto
        px-5
        py-10
        text-cream
        font-display
      "
    >
      {/* BULAN + TAHUN */}
      <h2 className="calendar-title text-center text-[22px] mb-10">
        {namaBulan[month]} {year}
      </h2>

      {/* NAMA HARI */}
      <div className="grid grid-cols-7 mb-5">
        {namaHari.map((hari) => (
          <p
            key={hari}
            className="
              text-center
              text-[11px]
              max-[380px]:text-[9px]
            "
          >
            {hari}
          </p>
        ))}
      </div>

      {/* TANGGAL */}
      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.map((item, index) => {
          const isSelected = item.currentMonth && item.day === selectedDay;

          return (
            <div
              key={index}
              className="
                calendar-day
                flex
                items-center
                justify-center
              "
            >
              <span
                className={`
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  text-[11px]

                  ${!item.currentMonth ? "opacity-25" : "opacity-100"}

                  ${isSelected ? "border border-cream rounded-full" : ""}
                `}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WeddingCalender;
