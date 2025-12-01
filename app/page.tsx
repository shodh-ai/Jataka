"use client";

import React, { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Components mimicking your exact original UI styles ---

const GradientBorder = ({ children, className = "", rounded = "rounded-[20px]" }: { children: React.ReactNode; className?: string; rounded?: string }) => (
  <div className={`relative ${className} bg-[#ffffff0a] ${rounded}`}>
    {/* The exact border technique from your code */}
    <div className={`absolute inset-0 pointer-events-none z-[1] p-px ${rounded} bg-[#FFFFFF0A/10]`} />
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ subtitle, title, align = "center" }: { subtitle: string; title: React.ReactNode; align?: "center" | "left" }) => (
  <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "items-center text-center md:items-start md:text-left"}`}>
    <div className="font-bold text-[#566fe9] text-sm tracking-[2.80px] uppercase">
      {subtitle}
    </div>
    <h2 className={`bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold text-3xl md:text-[64px] leading-tight md:leading-[1.1]`}>
      {title}
    </h2>
  </div>
);

// --- Data ---

const problemCards = [
  {
    icon: "https://c.animaapp.com/mik17n6qd0VDsr/img/icon-container-2.svg",
    title: "The Bench Time Money Pit",
    description: 'Every day a fresher spends "learning the ropes" is a day you pay a salary but can\'t bill the client.',
    badges: ["Idle Talent", "Planning", "Non-Billable Time"],
  },
  {
    icon: "https://c.animaapp.com/mik17n6qd0VDsr/img/icon-container-3.svg",
    title: "Senior Burnout",
    description: "Your Senior Devs spend 20% of their week explaining the same architecture diagrams and setting up the same env variables.",
    badges: ["Productivity Loss", "Mentor Overload"],
  },
  {
    icon: "https://c.animaapp.com/mik17n6qd0VDsr/img/icon-container-1.svg",
    title: 'The "Bus Factor" Risk',
    description: "If your Lead Dev quits tomorrow, the mental map of your legacy codebase walks out the door with them.",
    badges: ["Critical Dependency", "Team Fragility"],
  },
  {
    icon: "https://c.animaapp.com/mik17n6qd0VDsr/img/icon-container.svg",
    title: 'The "Silent Failure"',
    description: 'Juniors read the docs, say "I understand," and then crash production because they missed the unwritten rules.',
    badges: ["Unwritten Rules", "False Confidence"],
  },
];

type TableCell = string | { icon: string; text: string };

type TableRow = {
  feature: string;
  loom: TableCell;
  git: TableCell;
  notion: TableCell;
  ourEngine: TableCell;
};

const tableData: TableRow[] = [
  { feature: "Experience", loom: "Passive Watching", git: "Static Reading", notion: "Static Reading", ourEngine: "Active Simulation" },
  { feature: 'Captures "Why"', loom: { icon: "check", text: "If they say so" }, git: { icon: "x", text: "Just the result" }, notion: { icon: "check", text: "If updated" }, ourEngine: { icon: "check", text: "Linked to Action" } },
  { feature: "Verifies Skill", loom: { icon: "x", text: "Hope they watched" }, git: { icon: "x", text: "Hope they read" }, notion: { icon: "x", text: "" }, ourEngine: { icon: "check", text: "Auto-Verification" } },
  { feature: "Maintenance", loom: { icon: "x", text: "Re-record everything" }, git: { icon: "check", text: "" }, notion: { icon: "x", text: "Instantly Stale" }, ourEngine: { icon: "check", text: "Edit the Graph" } },
  { feature: "Setup Time", loom: "High (Editing/Upload)", git: "N/A", notion: "High (Writing)", ourEngine: "Zero (Just Work)" },
];

export default function JatakaLandingPage() {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cardWidth, setCardWidth] = useState(562); // Default desktop width
  
  const totalCards = problemCards.length;
  // Create infinite cards by duplicating the array
  const infiniteCards = [...problemCards, ...problemCards];
  const infiniteTotalCards = infiniteCards.length;

  // Handle responsive card width for the carousel logic
  useEffect(() => {
    const handleResize = () => {
      // On mobile (less than 768px), card is 85% of screen width. On desktop, fixed 562px.
      if (window.innerWidth < 768) {
        setCardWidth(window.innerWidth * 0.85);
      } else {
        setCardWidth(562);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentCardIndex(prev => {
      const newIndex = prev - 1;
      return newIndex < 0 ? totalCards - 1 : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentCardIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= totalCards ? 0 : newIndex;
    });
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check for stored target section on page load
  useEffect(() => {
    const targetSection = sessionStorage.getItem('targetSection');
    if (targetSection) {
      sessionStorage.removeItem('targetSection');
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 300);
    }
  }, []);

  return (
    <div className="bg-[#0b132b] min-h-screen w-full relative overflow-x-hidden text-white selection:bg-[#566fe9]/30">
      
      {/* --- Background Ambient Glows --- */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white opacity-5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#566fe9] opacity-10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

      {/* --- Header --- */}
      <header className="fixed top-0 md:top-6 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-[100px] py-4 md:py-0 max-w-[1920px] mx-auto w-full relative bg-[#0b132b]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-none">
        <img
          className="h-7 md:h-9 w-auto"
          alt="Logo"
          src="jatakalogo.svg"
        />

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
                onClick={() => router.push('/book-pilot')}
                className="w-full py-4 mt-2 rounded-md border border-white/20 bg-white/5 font-medium"
              >
                Book a Pilot
              </button>
          </div>
        )}
      </header>

      {/* --- Main Content Wrapper --- */}
      <main id="home" className="flex flex-col items-center w-full pt-28 md:pt-48 pb-20 gap-24 md:gap-40">

        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center gap-12 px-4 max-w-4xl mx-auto text-center relative z-10 w-full">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="font-bold text-[#566fe9] text-xs md:text-sm tracking-[2.80px] px-4 py-1 ">
              WELCOME TO JATAKA
            </div>

            <h1 className="w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold text-4xl md:text-[60px] leading-[1.1] md:leading-[100%] tracking-[1%] text-center whitespace-normal md:whitespace-nowrap">
              <span className="block">Clone Your Senior Engineers</span>
              <span className="block">Automate Your Onboarding</span>
            </h1>
            
            <p className="max-w-[643px] opacity-60 font-medium text-sm md:text-[16px] leading-[1.6]">
              Stop pulling your Lead Architects off billable work to train new
              hires. Jataka captures their expertise once - debugging,
              deployment, and decision-making - and turns it into an interactive
              simulation for every new joiner.
            </p>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 w-full md:w-auto">
            <div className="relative group cursor-pointer w-full md:w-auto">
               <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
               <button 
                onClick={() => router.push('/book-pilot')}
                className="relative w-full md:w-[148px] h-[54px] px-6 py-4 bg-[#ffffff1a] rounded-md backdrop-blur-md border border-white/20 hover:bg-[#ffffff26] transition-all"
              >
                <span className="font-medium text-sm">Book a Pilot</span>
              </button>
            </div>

            <button className="w-full md:w-[167px] h-[54px] px-6 py-4 rounded-md border border-white/20 bg-transparent hover:bg-white/5 transition-colors">
              <span className="font-medium text-sm">See Simulation</span>
            </button>
          </div>

          {/* Video Placeholder Box */}
          <div className="w-full max-w-[1240px] aspect-video md:h-[589px] mt-6 md:mt-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Play className="fill-white w-6 h-6 md:w-8 md:h-8 ml-1" />
                </div>
             </div>
             <img src="https://c.animaapp.com/mik17n6qd0VDsr/img/image-container.png" alt="Video Placeholder" className="w-full h-full object-cover opacity-50" />
          </div>
        </section>

        {/* --- Problem Section --- */}
        <section className="w-full max-w-[1240px] px-4 mx-auto flex flex-col gap-10 md:gap-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            <SectionHeader subtitle="THE INDUSTRY PROBLEM" title="The Knowledge Gap Is Costly" align="left" />
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ffffff0a] border border-white/20 flex items-center justify-center transition-all hover:bg-[#ffffff1a]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ffffff0a] border border-white/20 flex items-center justify-center transition-all hover:bg-[#ffffff1a]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card Carousel */}
          <div className="relative overflow-hidden w-full">
            <div 
              className="flex gap-[10px] transition-transform duration-300 ease-in-out"
              style={{ 
                // Dynamic calculation based on screen size
                transform: `translateX(${-(currentCardIndex * (cardWidth + 10))}px)`,
                width: `${infiniteTotalCards * (cardWidth + 10)}px`
              }}
            >
              {infiniteCards.map((card, index) => (
                <div
                  key={`${index}-${card.title}`}
                  className="flex-shrink-0 transition-all duration-300"
                  style={{
                    width: `${cardWidth}px`, // Responsive Width
                    height: '335px',
                  }}
                >
                  <GradientBorder className="w-full h-full rounded-[20px] border border-white/20 p-6 md:p-[36px]">
                    <div className="flex flex-col gap-6 md:gap-8 h-full">
                      <img className="w-10 h-10 md:w-12 md:h-12" alt="Icon" src={card.icon} />
                      
                      <div className="flex flex-col gap-3 md:gap-4 flex-grow">
                        <h3 className="text-2xl md:text-[28px] leading-[1.2] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_20%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold whitespace-normal">
                          {card.title}
                        </h3>
                        <p className="opacity-60 text-sm md:text-base leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {card.badges.map((badge, idx) => (
                          <span key={idx} className="px-3 py-1 md:px-4 md:py-2 bg-[#ffffff]/10 rounded-full text-xs md:text-sm font-medium hover:bg-[#ffffff26] transition-colors">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GradientBorder>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section id="how-it-works" className="w-full max-w-[1240px] px-4 mx-auto flex flex-col items-center gap-12 md:gap-20">
           <SectionHeader subtitle="HOW IT WORKS" title={<>We Don't Just Record Video,<br/>We Capture Thinking</>} />
           
           <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-12 mt-4 md:mt-10">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[50px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
              
              {[
                {
                  icon: "/passive-imprint.gif",
                  title: "The Passive Imprint",
                  desc: "Captures your Senior's code, logs, clicks, and the intent behind each decision.",
                },
                {
                  icon: "/reasoning-engine.gif",
                  title: "The Reasoning Engine",
                  desc: "We map causality, connecting actions to outcomes to capture tacit knowledge.",
                },
                {
                  icon: "/active-simulation.gif",
                  title: "The Active Simulation",
                  desc: "New hires train in a live simulation, with the AI correcting them.",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-6 text-center relative z-10">
                   <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center bg-[#ffffff0d] rounded-full border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
                      <img className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] object-cover" alt="icon" src={item.icon} />
                   </div>
                   <div className="flex flex-col gap-2">
                      <h3 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">{item.title}</h3>
                      <p className="opacity-60 max-w-[300px] mx-auto text-sm md:text-base">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* --- Comparison Table --- */}
        <section id="services" className="w-full max-w-[1240px] px-4 mx-auto flex flex-col items-center gap-16">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
             <SectionHeader subtitle="WHY CHOOSE US" title="Why Video & Git Are Failing You" />
             <p className="opacity-60 text-sm md:text-base">
                Videos make learning passive, Git hides the entire problem-solving journey, and docs rarely stay updated. 
                Our system captures the actual workflow and reasoning.
             </p>
          </div>

          <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[900px] w-full">
               {/* Table Header */}
               <div className="grid grid-cols-5">
                  {["Features", "Loom / Video", "Git / Github", "Notion / Docs", "Our Engine"].map((head, i) => (
                    <div key={i} className={`h-[60px] md:h-[80px] flex items-center justify-center border border-[#ffffff0d] bg-[#ffffff03] ${i === 4 ? "bg-[#ffffff0d] rounded-tr-[20px]" : ""} ${i === 0 ? "justify-start pl-8 rounded-tl-[20px]" : ""}`}>
                       <span className={`text-base md:text-xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent`}>
                         {head}
                       </span>
                    </div>
                  ))}
               </div>

               {/* Table Body */}
               {tableData.map((row, i) => {
                  const isLast = i === tableData.length - 1;
                  return (
                    <div key={i} className="grid grid-cols-5">
                      {/* Feature Name */}
                      <div className={`h-[80px] md:h-[100px] flex items-center pl-4 md:pl-8 border border-[#ffffff0d] bg-[#ffffff03] ${isLast ? "rounded-bl-[20px]" : ""}`}>
                         <span className="text-sm md:text-lg font-medium bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                           {row.feature}
                         </span>
                      </div>
                      
                      {/* Columns 2,3,4,5 */}
                      {(Object.keys(row["loom"] === "string" ? { loom: "", git: "", notion: "", ourEngine: "" } : row) as (keyof TableRow)[]).filter(key => key !== "feature").map((key, colIndex) => {
                         const cell = row[key];
                         const isOurEngine = key === "ourEngine";
                         return (
                           <div key={colIndex} className={`h-[80px] md:h-[100px] flex flex-col items-center justify-center gap-2 border border-[#ffffff0d] ${isOurEngine ? "bg-[#ffffff0d]" : "bg-[#ffffff03]"} ${isLast && isOurEngine ? "rounded-br-[20px]" : ""}`}>
                              {typeof cell === "string" ? (
                                <span className="text-white font-medium text-xs md:text-base text-center px-2">{cell}</span>
                              ) : cell.icon === "empty" ? (
                                <span className="opacity-20">-</span>
                              ) : (
                                <>
                                  {cell.icon === "check" ? (
                                    <img
                                      src="/tick.svg"
                                      alt="Tick"
                                      className="w-5 h-5 md:w-6 md:h-6"
                                    />
                                  ) : (
                                    <img
                                      src="/cross.svg"
                                      alt="Cross"
                                      className="w-5 h-5 md:w-6 md:h-6"
                                    />
                                  )}
                                  {cell.text && <span className="text-white/50 text-xs md:text-sm text-center">{cell.text}</span>}
                                </>
                              )}
                           </div>
                         )
                      })}
                    </div>
                  )
               })}
            </div>
          </div>
        </section>

        {/* --- Features (Bento Grid) --- */}
        <section className="w-full max-w-[1240px] px-4 mx-auto flex flex-col gap-12">
           <SectionHeader subtitle="THE AI ADVANTAGE" title="Built for the Agentic Future" align="left" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Real-Time Event Correlation",
                  desc: "Syncs voice, code context, and browser actions in milliseconds to create a unified stream of every decision.",
                  img: "https://c.animaapp.com/mik17n6qd0VDsr/img/text-container.png"
                },
                {
                  title: "Pedagogical Knowledge Graph",
                  desc: "Maps all dependencies and prerequisites in your workflow, knowing what a developer must learn before the next step.",
                  img: "https://c.animaapp.com/mik17n6qd0VDsr/img/text-container-1.png"
                }
              ].map((card, i) => (
                <GradientBorder key={i} className="h-auto md:h-[378px] overflow-hidden">
                   <div className="relative h-full p-6 md:p-9 flex flex-col justify-end">
                      <div className="relative z-10 flex flex-col gap-4 md:gap-6 mt-[180px]">
                         <h3 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                            {card.title}
                         </h3>
                         <p className="opacity-60 text-sm md:text-base leading-relaxed max-w-[500px]">{card.desc}</p>
                      </div>
                      <img src={card.img} alt={card.title} className="absolute top-6 left-6 w-auto h-[120px] md:h-[150px] opacity-80" />
                   </div>
                </GradientBorder>
              ))}
           </div>

           {/* Full width card */}
           <GradientBorder className="h-auto lg:h-[380px] w-full overflow-hidden">
             <div className="flex flex-col lg:flex-row items-center h-full p-6 md:p-9 gap-8 md:gap-12">
               <div className="flex flex-col gap-4 md:gap-6 lg:max-w-[50%]">
                 <h3 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                    The "Standards" Guardrail
                 </h3>
                 <p className="opacity-60 text-sm md:text-base leading-relaxed">
                    Automatically enforces your organization's coding style, architectural rules, naming conventions, and best practices. 
                    Whether it's API structure, logging format, or how services communicate.
                 </p>
               </div>
               <div className="flex-grow flex justify-center lg:justify-end w-full">
                 <img className="w-full max-w-[300px] md:max-w-[480px]" alt="Guardrail" src="https://c.animaapp.com/mik17n6qd0VDsr/img/image-container.png" />
               </div>
             </div>
           </GradientBorder>
        </section>

        {/* --- Footer --- */}
        <footer className="w-full flex flex-col items-center gap-16 px-4">
           <div className="flex flex-col items-center text-center gap-8 md:gap-10">
              <div className="font-bold text-[#566fe9] text-sm tracking-[2.80px]">JOIN US</div>
              <h2 className="max-w-[900px] text-2xl md:text-4xl font-semibold leading-tight bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                <span className="block">Turn your Junior Engineers into Seniors,</span>
                <span className="block">faster than you thought possible</span>
              </h2>
              
              <div className="relative group mt-4 md:mt-8">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
                <button 
                  onClick={() => router.push('/book-pilot')}
                  className="relative w-[148px] h-[54px] bg-[#ffffff1a] rounded-md backdrop-blur-md border border-white/20 hover:bg-[#ffffff26] transition-all"
                >
                  <span className="font-medium text-sm">Book a Pilot</span>
                </button>
              </div>
           </div>

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

      </main>
    </div>
  );
};