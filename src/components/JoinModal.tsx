"use client";

import { event } from "@/lib/gtag";

export default function JoinModal() {
  return (
    <div 
      onClick={() => {
        event({
          action: "click_join_button",
          category: "engagement",
          label: "Telegram guruhga to'g'ridan to'g'ri o'tish",
        });
      }} 
      className="w-full group relative block animate-heartbeat mt-1 cursor-pointer"
    >
      <div className="absolute inset-0 bg-[#EAB308] rounded-3xl blur-md animate-pulse opacity-60"></div>
      <a 
        href="https://t.me/+7WSE4vlcrAozYjQy"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#B48325] via-[#FCE486] to-[#B48325] text-black font-black text-lg sm:text-xl py-3.5 sm:py-4 rounded-3xl transition-transform active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.5)] cursor-pointer hover:no-underline"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-black" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.25-5.61 3.66-.53.36-1.01.53-1.44.52-.48-.01-1.39-.27-2.07-.49-.83-.27-1.49-.41-1.43-.87.03-.23.36-.47.98-.73 3.84-1.67 6.41-2.77 7.72-3.31 3.67-1.53 4.43-1.8 4.93-1.8.11 0 .36.03.49.13.11.08.15.2.16.32.02.09.02.19.01.27z"/>
        </svg>
        <span>QO'SHILISH</span>
      </a>
    </div>
  );
}
