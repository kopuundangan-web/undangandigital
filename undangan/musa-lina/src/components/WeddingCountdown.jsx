import { useEffect, useState } from "react";

function WeddingCountdown({
  targetDate,
  title = "Walimatul Urs",
  location = "",
  description = "",
}) {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();

    const distance = target - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),

      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),

      minutes: Math.floor((distance / (1000 * 60)) % 60),

      seconds: Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  // Google Calendar
  const saveToCalendar = () => {
    const start = new Date(targetDate);

    // Default durasi acara 2 jam
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const formatGoogleDate = (date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    };

    const url = new URL("https://calendar.google.com/calendar/render");

    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", title);

    url.searchParams.set(
      "dates",
      `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    );

    url.searchParams.set("details", description);
    url.searchParams.set("location", location);

    window.open(url.toString(), "_blank");
  };

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-center
        font-display
        text-cream
      "
    >
      {/* COUNTDOWN */}
      <div
        className="
          grid
          grid-cols-4
          w-full
          max-w-[380px]
          text-center
        "
      >
        <CountdownItem value={formatNumber(timeLeft.days)} label="Days" />

        <CountdownItem value={formatNumber(timeLeft.hours)} label="Hours" />

        <CountdownItem value={formatNumber(timeLeft.minutes)} label="Minutes" />

        <CountdownItem value={formatNumber(timeLeft.seconds)} label="Second" />
      </div>

      {/* SAVE TO CALENDAR */}
      <button
        type="button"
        onClick={saveToCalendar}
        className="btn-primary mt-7"
      >
        Simpan di kalender
      </button>
    </div>
  );
}

function CountdownItem({ value, label }) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
      "
    >
      <span
        className="
          text-[38px]
          max-[400px]:text-[32px]
          leading-none
          tabular-nums
        "
      >
        {value}
      </span>

      <span
        className="
          text-[14px]
          max-[400px]:text-[12px]
          mt-2
        "
      >
        {label}
      </span>
    </div>
  );
}

export default WeddingCountdown;
