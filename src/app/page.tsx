import RevenueCalculator from "@/components/revenue-calculator-interactive";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <RevenueCalculator />
    </main>
  );
}
