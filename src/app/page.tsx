import RevenueCalculator from "@/components/revenue-calculator-interactive";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Revenue Calculator
        </h1>
        <RevenueCalculator />
      </div>
    </main>
  );
}
