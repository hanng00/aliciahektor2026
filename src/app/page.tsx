import Image from "next/image";
import RsvpForm from "./RsvpForm";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Subtle Pink Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aliciahektor-main.jpg"
          alt="Alicia och Hektor"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-wedding-pink/40 via-wedding-light-pink/30 to-wedding-pink/40" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl w-full mx-auto text-center px-4 py-12 flex flex-col items-center">
        {/* Names */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight fade-in-up drop-shadow-[0_4px_12px_rgba(201,76,92,0.5)]"
          style={{ textShadow: "2px 2px 8px rgba(139,46,57,0.8)" }}
        >
          Alicia & Hektor
        </h1>

        <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full fade-in-up delay-100 shadow-lg" />

        <p
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center mb-10 tracking-wide fade-in-up delay-200 drop-shadow-lg"
          style={{ textShadow: "1px 1px 6px rgba(139,46,57,0.7)" }}
        >
          2026
        </p>

        {/* Toastmaster note */}
        <p
          className="text-sm sm:text-base text-white mb-5 max-w-xl tracking-wide font-medium drop-shadow-md fade-in-up delay-400"
          style={{ textShadow: "1px 1px 4px rgba(139,46,57,0.7)" }}
        >
          Kontakta toastmaster och toastmadame om du vill hålla tal eller dylikt.
        </p>

        <a
          href="mailto:toast@aliciahektor2026.se"
          className="inline-block text-base sm:text-lg px-10 py-4 bg-white text-wedding-red rounded-full transition-all duration-500 hover:bg-wedding-red hover:text-white hover:shadow-2xl font-semibold tracking-wide shadow-xl mb-10 fade-in-up delay-400"
        >
          Kontakta Toastmaster & Toastmadame
        </a>

        {/* RSVP Form */}
        <div className="w-full max-w-xl fade-in-up delay-500">
          <RsvpForm />
        </div>

        <p
          className="text-sm sm:text-base text-white mt-6 tracking-wide font-medium drop-shadow-md fade-in-up delay-500"
          style={{ textShadow: "1px 1px 4px rgba(139,46,57,0.7)" }}
        >
          Inga barn är bjudna på bröllopet.
        </p>
      </main>
    </div>
  );
}
