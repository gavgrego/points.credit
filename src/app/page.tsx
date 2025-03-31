import Chart from '@/components/Chart';
import CurrentBonuses from '@/components/CurrentBonuses';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Card className="bg-card rounded-lg shadow-lg border border-border/40 p-6">
        <h2>
          Use the graph to see where your points can go! Supports American
          Express, Chase, Citi, Capital One, and BILT.
        </h2>
        <div className="hidden md:block">
          <Chart />
        </div>
        <div className="md:hidden p-8 text-center">
          <p className="text-lg text-muted-foreground">
            Due to the size and inherent nature of a Sankey graph, please visit
            on desktop to see the graph of transfer partners and programs.
          </p>
        </div>
      </Card>
      <CurrentBonuses />
    </div>
  );
}
