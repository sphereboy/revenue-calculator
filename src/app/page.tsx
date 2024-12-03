import RevenueCalculator from "@/components/revenue-calculator-interactive";
import UnderwaterBackground from "@/components/underwater-background";
import LuckyFish from "@/components/lucky-fish";
import { Toaster } from "sonner";
import Image from "next/image";

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
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js"
                alt="Next.js"
              />
            </a>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript"
                alt="TypeScript"
              />
            </a>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwindcss"
                alt="Tailwind"
              />
            </a>
            <a
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Framer_Motion-✨-ff69b4?style=flat&logo=framer"
                alt="Framer Motion"
              />
            </a>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
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
        </footer>
      </main>
    </div>
  );
}
