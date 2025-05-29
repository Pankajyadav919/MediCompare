import { useEffect } from "react";
import c from '../assets/compimg.jpeg' 
export default function PremiumLandingPage() {
    useEffect(() => {
        const featureItems = document.querySelectorAll<HTMLElement>(".feature-item");
        const searchTags = document.querySelector(".search-tags") as HTMLElement | null;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains("search-tags")) {
                            entry.target.classList.add("visible");
                        } else if (entry.target.classList.contains("feature-item")) {
                            entry.target.classList.add("visible");
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        featureItems.forEach((item) => observer.observe(item));
        if (searchTags) observer.observe(searchTags);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <style>
                {`
                @keyframes float {
                  0%, 100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-10px);
                  }
                }

                @keyframes shine {
                  0% {
                    transform: translateX(-100%) rotate(30deg);
                    opacity: 0;
                  }
                  50% {
                    opacity: 0.3;
                  }
                  100% {
                    transform: translateX(100%) rotate(30deg);
                    opacity: 0;
                  }
                }

                .animate-float {
                  animation: float 6s ease-in-out infinite;
                }

                .animate-shine {
                  animation: shine 2s infinite;
                }

                .feature-item {
                  transform: translateX(-50px);
                  opacity: 0;
                  transition: transform 0.7s ease, opacity 0.7s ease;
                }

                .feature-item.visible {
                  transform: translateX(0);
                  opacity: 1;
                }

                .search-tags {
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.7s ease, transform 0.7s ease;
                }

                .search-tags.visible {
                  opacity: 1;
                  transform: translateY(0);
                }
                `}
            </style>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen max-w-[1600px] mx-auto">
                <div className="relative flex items-center justify-center p-16 bg-gradient-to-br from-[rgba(10,36,99,0.1)] to-[rgba(30,59,138,0.05)] overflow-hidden">
                    <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_transparent_70%)] -top-24 -left-24 animate-float" />
                    <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_transparent_70%)] -bottom-12 -right-12 animate-float" style={{ animationDelay: '2s' }} />
                    <div className="relative w-full h-[80%] border-[15px] border-[#e5e5e5] rounded shadow-[20px_20px_50px_rgba(0,0,0,0.15),_inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[25px_25px_60px_rgba(0,0,0,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-transform duration-500">
                        <div className="absolute -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 border-2 border-[#d4af37] rounded opacity-50 -z-10" />
                        <img
                            src={c}
                            alt="Premium Healthcare Solutions"
                            className="w-full h-full object-cover object-center rounded"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center p-24 relative">
                    <div className="text-[#d4af37] uppercase tracking-[3px] mb-6 font-serif text-sm relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-[2px] after:bg-[#d4af37]">
                        Healthcare Innovation
                    </div>
                    <h1 className="font-serif text-[3.2rem] font-bold leading-tight text-[#0a2463] mb-10">
                        Let's Make <span className="relative inline-block text-[#d4af37] after:content-[''] after:absolute after:bottom-[5px] after:left-0 after:w-full after:h-3 after:bg-[rgba(212,175,55,0.25)] after:-z-10 after:-skew-y-1">Healthcare</span> More Affordable
                    </h1>

                    <div className="space-y-6">
                        {[
                            { icon: "✓", text: "Live Medicine Price Comparison" },
                            { icon: "⌚", text: "Accessible 24/7" },
                            { icon: "🔍", text: "Real-Time Availability Checking" },
                            { icon: "📊", text: "Access To 6,00,000 + Medicine Data" },
                            { icon: "💊", text: "Substitute Suggestions" },
                        ].map((feature, idx) => (
                            <div key={idx} className="feature-item flex items-center" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="min-w-[50px] h-[50px] bg-gradient-to-br from-[#0a2463] to-[#1e3b8a] text-[#f5e6ab] rounded-full flex items-center justify-center text-xl shadow-lg relative overflow-hidden">
                                    <span style={{ fontFamily: "Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, Android Emoji, EmojiSymbols, sans-serif" }}>
                                        {feature.icon}
                                    </span>
                                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-[rgba(212,175,55,0.3)] to-transparent rotate-[30deg] animate-shine" />
                                </div>
                                <div className="ml-6 text-[#1e3b8a] font-medium text-base tracking-wide">
                                    {feature.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
