import RevenueCalculator from "@/components/revenue-calculator-interactive";
import UnderwaterBackground from "@/components/underwater-background";
import LuckyFish from "@/components/lucky-fish";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Toaster position="top-center" />
      <UnderwaterBackground />
      <div className="relative z-20">
        <LuckyFish />
      </div>
      <main className="relative h-full w-full flex items-center justify-center p-4 z-10">
        <RevenueCalculator />
      </main>
    </div>
  );
}
