"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, CheckCircle2, Menu, X } from "lucide-react";
// Import the supabase client
import { supabase } from "@/lib/supabaseClient"; 

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
}

const GradientBorder = ({ children, className = "", rounded = "rounded-[20px]" }: GradientBorderProps) => (
  <div className={`relative ${className} bg-[#ffffff05] ${rounded} border border-[#ffffff0a]`}>
    <div className={`absolute inset-0 pointer-events-none z-[1] p-px ${rounded} `} />
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

export default function BookPilotPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contactNumber: "",
    teamSize: "",
    role: "",
    problem: ""
  });

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (sectionId === 'home' || sectionId === 'services' || sectionId === 'how-it-works') {
      sessionStorage.setItem('targetSection', sectionId);
      router.push('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('pilot_bookings')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            contact_number: formData.contactNumber,
            team_size: formData.teamSize,
            role: formData.role,
            problem: formData.problem,
          },
        ]);

      if (error) throw error;
      setIsSubmitted(true);
      setFormData({
        name: "", email: "", company: "", contactNumber: "", 
        teamSize: "", role: "", problem: ""
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Added text-base for mobile to prevent iOS zoom on focus, md:text-sm for desktop
  const inputClasses = "w-full px-4 py-3 bg-[#ffffff0a] border border-white/20 rounded-md focus:outline-none focus:border-[#566fe9] transition-colors text-white text-base md:text-sm placeholder-white/30";

  return (
    <div className="bg-[#0b132b] min-h-screen w-full relative overflow-x-hidden text-white selection:bg-[#566fe9]/30">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white opacity-5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#566fe9] opacity-10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 md:top-6 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-[100px] py-4 md:py-0 max-w-[1920px] mx-auto w-full relative bg-[#0b132b]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-none">
        <img className="h-7 md:h-9 w-auto" alt="Logo" src="jatakalogo.svg" />
        
        {/* Desktop Nav */}
        <nav className="hidden md:inline-flex w-[609px] h-[54px] items-center gap-[52px] pl-9 pr-[2px] py-[6px] bg-[#ffffff0a] rounded-xl border border-white/5 backdrop-blur-md absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Home", id: "home" },
            { label: "Services", id: "services" },
            { label: "Pricing", id: "pricing" },
            { label: "What we do", id: "how-it-works" }
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-opacity ${i === 0 ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => router.push('/book-pilot')}
            className="w-[131px] h-[42px] px-[6px] py-[6px] rounded-md border border-[#ffffff66] bg-transparent hover:bg-[#ffffff0a] transition-colors text-sm font-medium"
          >
            Book a Pilot
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[100%] left-0 w-full bg-[#0b132b] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-5">
             {[
                { label: "Home", id: "home" },
                { label: "Services", id: "services" },
                { label: "Pricing", id: "pricing" },
                { label: "What we do", id: "how-it-works" }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-lg font-medium opacity-80 active:opacity-100 py-2 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  router.push('/book-pilot');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-4 mt-2 rounded-md border border-white/20 bg-white/5 font-medium"
              >
                Book a Pilot
              </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full pt-32 md:pt-40 pb-20 px-4 md:px-4">
        <div className="max-w-3xl w-full mx-auto">
          {!isSubmitted && (
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block font-bold text-[#566fe9] text-xs md:text-sm tracking-[2.80px] px-4 py-1 rounded-full mb-4 md:mb-6 border border-white/5 bg-white/5 md:border-none md:bg-transparent">
                BOOK A PILOT
              </div>
              <h1 className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold text-3xl md:text-[48px] leading-[1.2] md:leading-[130%] tracking-[1%] text-center mb-6">
                Get a 20-minute demo tailored to your engineering workflow
              </h1>
            </div>
          )}

          {isSubmitted ? (
            <div className="flex justify-center w-full">
              <GradientBorder className="w-full max-w-[533px] h-auto min-h-[300px] md:h-[328px] p-8 md:p-[60px] flex items-center justify-center" rounded="rounded-[20px]">
                <div className="flex flex-col items-center text-center gap-8 md:gap-[60px] w-full h-full">
                  <div className="flex items-center justify-center ">
                    <img src="/tick.svg" alt="Tick" className="w-16 h-16 md:w-[84px] md:h-[84px]" />
                  </div>
                  <div className="space-y-4 md:space-y-2">
                    <h2 className="text-2xl md:text-[40px] font-semibold tracking-[0.04em] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.6)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent leading-tight">
                      Pilot Scheduled!
                    </h2>
                    <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
                      You’ll hear from our team shortly with your pilot details.
                    </p>
                  </div>
                </div>
              </GradientBorder>
            </div>
          ) : (
            <GradientBorder className="p-6 md:p-10 w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-[#D1D5DB] mb-2">Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Arastu Sharma" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-[#D1D5DB] mb-2">Work Email Address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="arastusharma@gmail.com" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm text-[#D1D5DB] mb-2">Company Name</label>
                  <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Shodh AI" />
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block text-sm text-[#D1D5DB] mb-2">Contact Number</label>
                  <input type="tel" id="contactNumber" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} className={inputClasses} placeholder="+91-912345678" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="teamSize" className="block text-sm text-[#D1D5DB] mb-2">Team Size</label>
                  <div className="relative">
                    <select id="teamSize" name="teamSize" required value={formData.teamSize} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0b132b]">Select Size</option>
                      <option value="1-10" className="bg-[#0b132b]">1-10</option>
                      <option value="10-50" className="bg-[#0b132b]">10-50</option>
                      <option value="50-100" className="bg-[#0b132b]">50-100</option>
                      <option value="100+" className="bg-[#0b132b]">100+</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="role" className="block text-sm text-[#D1D5DB] mb-2">Role/Position</label>
                  <div className="relative">
                    <select id="role" name="role" required value={formData.role} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0b132b]">Select Role</option>
                      <option value="Lead Engineer" className="bg-[#0b132b]">Lead Engineer</option>
                      <option value="CTO" className="bg-[#0b132b]">CTO</option>
                      <option value="Product Manager" className="bg-[#0b132b]">Product Manager</option>
                      <option value="Developer" className="bg-[#0b132b]">Developer</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label htmlFor="problem" className="block text-sm text-[#D1D5DB] mb-2">What Problem Are You Looking to Solve?</label>
                <textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} rows={4} className={`${inputClasses} resize-none h-[120px]`} placeholder="For example: Reducing Ramp-Up Time" />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group cursor-pointer w-full h-[54px] px-6 py-4 bg-[#ffffff1a] rounded-md backdrop-blur-md border border-white/20 hover:bg-[#ffffff26] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity" />
                  <span className="relative font-medium text-sm flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        Submitting...
                      </>
                    ) : (
                      "Book a Pilot"
                    )}
                  </span>
                </button>
              </div>

              </form>
            </GradientBorder>
          )}
        </div>
      </main>

      <footer className="w-full flex flex-col items-center gap-16 px-4 pb-10">
         <div className="flex flex-col items-center gap-8 pt-10 border-t border-white/5 w-full max-w-[400px]">
            <div className="flex flex-col items-center gap-2">
               <img className="h-12 w-auto" alt="Logo" src="jatakalogo.svg" />
               <span className="opacity-50 text-sm">by</span>
               <img className="h-8 w-auto" alt="Logo" src="shodhlogo.svg" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
               {["Privacy Policy", "Terms and conditions", "Contact"].map((link, i) => (
                 <a key={i} href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">{link}</a>
               ))}
            </div>
         </div>
      </footer>
    </div>
  );
}