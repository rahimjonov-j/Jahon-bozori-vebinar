"use client";

import { useState } from "react";
import { submitRegistration } from "@/lib/api";
import { event } from "@/lib/gtag";

export default function JoinModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    ism: "",
    familya: "",
    nomer: "+998",
    yonalish: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Ensure it always starts with +998
    if (!val.startsWith("+998")) {
      val = "+998";
    }

    // Extract digits only after +998
    const digitsOnly = val.slice(4).replace(/\D/g, "");
    const limited = digitsOnly.slice(0, 9);
    
    // Format as: +998 99 090 76 87
    let formatted = "+998";
    if (limited.length > 0) {
      formatted += " " + limited.substring(0, 2);
    }
    if (limited.length > 2) {
      formatted += " " + limited.substring(2, 5);
    }
    if (limited.length > 5) {
      formatted += " " + limited.substring(5, 7);
    }
    if (limited.length > 7) {
      formatted += " " + limited.substring(7, 9);
    }

    setFormData({ ...formData, nomer: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Validate phone number length (9 digits after +998)
    const phoneDigits = formData.nomer.slice(4).replace(/\D/g, "");
    if (phoneDigits.length < 9) {
      showToast("Iltimos, telefon raqamni to'liq kiriting", "error");
      return;
    }

    setIsLoading(true);
    setToast(null);

    try {
      // Google Sheets treats values starting with "+" as formulas, which causes an #ERROR!
      // We will remove the "+" sign or prepend a space to prevent this.
      const dataToSend = {
        ...formData,
        nomer: formData.nomer.replace("+", "") 
      };

      await submitRegistration(dataToSend);
      
      // Google Analytics: Track successful form submission
      event({
        action: "submit_form_success",
        category: "registration",
        label: formData.yonalish,
      });

      showToast("Muvaffaqiyatli yuborildi!", "success");
      setFormData({ ism: "", familya: "", nomer: "+998", yonalish: "" });
      
      // Redirect to Telegram group
      window.location.href = "https://t.me/+7WSE4vlcrAozYjQy";
      
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      showToast("Xatolik yuz berdi. Qaytadan urinib ko'ring.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full font-medium text-sm shadow-lg transition-all ${
          toast.type === 'success' 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
            : 'bg-red-500/20 text-red-400 border border-red-500/50'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Main CTA Button Trigger */}
      <div 
        onClick={() => {
          setIsOpen(true);
          event({
            action: "click_join_button",
            category: "engagement",
            label: "Telegram guruhga qo'shilish oynasi",
          });
        }} 
        className="w-full group relative block animate-heartbeat mt-1 cursor-pointer"
      >
        <div className="absolute inset-0 bg-[#EAB308] rounded-3xl blur-md animate-pulse opacity-60"></div>
        <button className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#B48325] via-[#FCE486] to-[#B48325] text-black font-black text-lg sm:text-xl py-3.5 sm:py-4 rounded-3xl transition-transform active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.5)] cursor-pointer">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-black" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.25-5.61 3.66-.53.36-1.01.53-1.44.52-.48-.01-1.39-.27-2.07-.49-.83-.27-1.49-.41-1.43-.87.03-.23.36-.47.98-.73 3.84-1.67 6.41-2.77 7.72-3.31 3.67-1.53 4.43-1.8 4.93-1.8.11 0 .36.03.49.13.11.08.15.2.16.32.02.09.02.19.01.27z"/>
          </svg>
          <span>QO'SHILISH</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-[0_0_40px_rgba(212,175,55,0.15)] relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              disabled={isLoading}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">
              Ro'yxatdan o'tish
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Ism</label>
                <input 
                  type="text" 
                  required 
                  value={formData.ism}
                  onChange={e => setFormData({...formData, ism: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/60 transition-colors"
                  placeholder="Ismingizni kiriting"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Familiya</label>
                <input 
                  type="text" 
                  required 
                  value={formData.familya}
                  onChange={e => setFormData({...formData, familya: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/60 transition-colors"
                  placeholder="Familiyangizni kiriting"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Telefon raqam</label>
                <input 
                  type="text" 
                  required 
                  value={formData.nomer}
                  onChange={handlePhoneChange}
                  className="w-full bg-zinc-900/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/60 transition-colors"
                  placeholder="+998 99 000 00 00"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Qaysi yo'nalishda ish olib borasiz?</label>
                <div className="relative">
                  <select
                    required
                    value={formData.yonalish}
                    onChange={e => setFormData({...formData, yonalish: e.target.value})}
                    className="w-full bg-zinc-900 border-2 border-[#D4AF37]/40 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/60 transition-colors appearance-none cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="" disabled>— Yo'nalishni tanlang —</option>
                    <option value="Sotuv">Sotuv</option>
                    <option value="Investitsiya">Investitsiya</option>
                    <option value="Biznes">Biznes</option>
                    <option value="Tadbirkorlik">Tadbirkorlik</option>
                    <option value="Oldi-soti">Oldi-soti</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-2 relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#B48325] via-[#FCE486] to-[#B48325] text-black font-black text-lg py-3.5 rounded-xl transition-transform active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.3)] disabled:opacity-70 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yuborilmoqda...
                  </span>
                ) : (
                  <span>Yuborish</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
