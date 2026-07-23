import Link from "next/link";
import JoinModal from "@/components/JoinModal";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-[100dvh] overflow-x-hidden bg-black text-white font-sans selection:bg-yellow-500/30">
      
      {/* Subtle bottom glow to match the reference image's button glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-yellow-600/20 blur-[100px] pointer-events-none"></div>

      <div className="z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl h-full mx-auto p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-16">
        
        {/* LEFT COLUMN: Headings, Dates, and CTA */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center gap-3 lg:gap-4 w-full max-w-[500px]">
          
          {/* Date & Time Pills */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>28-IYUL</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Soat: 20:20</span>
            </div>
          </div>

          {/* Solid Gold Pill */}
          <div className="bg-[#EAB308] text-black font-black uppercase px-5 sm:px-6 py-1.5 rounded-full text-[11px] sm:text-xs tracking-wider text-center mt-1">
            PREMIUM MIJOZLAR — ONLINE WEBINAR
          </div>

          {/* Main Headline */}
          <h1 className="text-center lg:text-left font-black uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] mt-1 tracking-tight">
            <span className="text-white block mb-1">Eng so'nggi va eksklyuziv</span>
            <span className="text-white block mb-1">narxlar taqdimotida</span>
            <span className="text-[#EAB308] block">qatnashing!</span>
          </h1>

          {/* Info Box */}
          <div className="w-full border border-[#D4AF37]/40 bg-zinc-950/80 rounded-2xl p-3 sm:p-4 text-center lg:text-left mt-1">
            <p className="text-[#D4AF37] font-bold text-sm sm:text-base leading-snug">
              28-iyul kuni soat 20:20 da bo'lib o'tadigan <br className="hidden sm:block"/>
              premium taqdimotga online qo'shiling!
            </p>
          </div>

          {/* Main CTA Button (Desktop only) */}
          <div className="hidden lg:block w-full">
            <JoinModal />
          </div>

          {/* Under button text (Desktop only) */}
          <div className="hidden lg:flex w-full items-center justify-center gap-1.5 sm:gap-2 text-[#D4AF37] font-semibold text-[11px] sm:text-xs mt-0.5 animate-bounce">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Telegram guruhga qo'shiling</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Section (Details) */}
        <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-3 w-full max-w-[500px] lg:max-w-none max-h-[40vh] lg:max-h-none overflow-hidden">
          {[
            "24/7 Universal do'konlar (1 kv/m = 1200$ dan bo'lgan joylardan).",
            "Sanuzel Biznesi va ROI si (barqaror daromad).",
            "Yaqinda sotuvga chiqarilayotgan jami 2400+ dan ortiq Parkovkalar.",
            "Qurilish Mollari (E-BLOK) dan eng oldi 24/7 ishlaydigan 6 m lik do'konlarni 1-lardan bo'lib tanlab olish imkoniyati.",
            "Atiga 6000$ bir martalik to'lov bilan (boshqa to'lov yo'q!) D-Oziq-ovqat Dehqon bozoridan chegaralangan savdo rastalarini egallash imkoniyati."
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 bg-zinc-900/60 border border-[#D4AF37]/20 p-2 sm:p-3 lg:p-4 rounded-lg lg:rounded-xl">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-[#EAB308] flex-shrink-0 shadow-[0_0_8px_#EAB308]"></div>
              <p className="text-white font-medium text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight text-left">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile CTA Button (Mobile only, rendered at the bottom) */}
        <div className="flex lg:hidden w-full flex-col items-center justify-center gap-2 mt-2 max-w-[500px]">
          <JoinModal />
          <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 text-[#D4AF37] font-semibold text-[11px] sm:text-xs animate-bounce">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Telegram guruhga qo'shiling</span>
          </div>
        </div>

      </div>
    </main>
  );
}
