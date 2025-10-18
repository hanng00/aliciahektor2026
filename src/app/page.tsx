import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Image with Subtle Pink Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aliciahektor-main.jpg"
          alt="Alicia och Hektor"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-wedding-pink/30 via-wedding-light-pink/20 to-wedding-pink/30" />
      </div>

      {/* Main Content - Direct Overlay */}
      <main className="relative z-10 max-w-3xl w-full text-center px-4">
        {/* Names with Background Glow */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight fade-in-up drop-shadow-[0_4px_12px_rgba(201,76,92,0.5)]" style={{ textShadow: '2px 2px 8px rgba(139,46,57,0.8)' }}>
          Alicia & Hektor
        </h1>

        {/* Divider */}
        <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full fade-in-up delay-100 shadow-lg" />

        {/* Year */}
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center mb-12 tracking-wide fade-in-up delay-200 drop-shadow-lg" style={{ textShadow: '1px 1px 6px rgba(139,46,57,0.7)' }}>
          2026
        </p>

        {/* Contact Section */}
        <div className="text-center fade-in-up delay-300">
          <p className="text-sm sm:text-base text-white mb-5 tracking-wide font-medium drop-shadow-md">
            För frågor och anmälningar
          </p>

          {/* CTA Button */}
          <a
            href="mailto:toast@aliciahektor2026.se"
            className="inline-block text-base sm:text-lg px-10 py-4 bg-white text-wedding-red rounded-full transition-all duration-500 hover:bg-wedding-red hover:text-white hover:shadow-2xl font-semibold tracking-wide shadow-xl"
          >
            Kontakta Toastmaster & Toastmadamme
          </a>
        </div>
      </main>
    </div>
  );
}
