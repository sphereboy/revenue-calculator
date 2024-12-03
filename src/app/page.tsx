import RevenueCalculator from "@/components/revenue-calculator-interactive";
import UnderwaterBackground from "@/components/underwater-background";
import LuckyFish from "@/components/lucky-fish";
import { Toaster } from "sonner";

const badges = [
  {
    href: "https://nextjs.org",
    src: "https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js",
    alt: "Next.js",
  },
  {
    href: "https://www.typescriptlang.org/",
    src: "https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript",
    alt: "TypeScript",
  },
  {
    href: "https://tailwindcss.com",
    src: "https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwindcss",
    alt: "Tailwind",
  },
  {
    href: "https://www.framer.com/motion/",
    src: "https://img.shields.io/badge/Framer_Motion-✨-ff69b4?style=flat&logo=framer",
    alt: "Framer Motion",
  },
];

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Toaster position="top-center" />
      <UnderwaterBackground />
      <div className="relative z-20">
        <LuckyFish />
      </div>
      <main className="relative h-full w-full flex flex-col items-center justify-center p-4 z-10">
        <RevenueCalculator />

        {/* Footer */}
        <footer className="fixed bottom-0 w-full py-4 px-6 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-2 flex-wrap justify-center">
            {badges.map((badge) => (
              <a
                key={badge.alt}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badge.src} alt={badge.alt} />
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              Created by{" "}
              <a
                href="https://github.com/sphereboy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                Rob
                <svg
                  height="16"
                  width="16"
                  viewBox="0 0 16 16"
                  className="inline"
                >
                  <path
                    fill="currentColor"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
              at{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                1 OAK Technologies
              </span>
            </div>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a
              href="https://www.buymeacoffee.com/sphereboy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-[#FFDD00] text-black font-medium rounded-lg hover:bg-[#FFDD00]/90 transition-colors shadow-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative -mt-px"
              >
                <path
                  d="M7.5 9.75H16.5M7.5 9.75V16.5H16.5V9.75M7.5 9.75L9 4.5H15L16.5 9.75M6 19.5H18C18.5523 19.5 19 19.0523 19 18.5V18.5C19 17.9477 18.5523 17.5 18 17.5H6C5.44772 17.5 5 17.9477 5 18.5V18.5C5 19.0523 5.44772 19.5 6 19.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Buy me a coffee
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
