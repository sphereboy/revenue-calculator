import RevenueCalculator from "@/components/revenue-calculator-interactive";
import UnderwaterBackground from "@/components/underwater-background";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <UnderwaterBackground />
      <main className="relative h-full w-full flex items-center justify-center p-4 z-10">
        <RevenueCalculator />
      </main>
    </div>
  );
}
