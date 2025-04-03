import { auth } from '@/auth';
import Chart from '@/components/Chart';
import CurrentBonuses from '@/components/CurrentBonuses';
import { Spinner } from '@/components/Spinner';
import { Card } from '@/components/ui/card';
import YourBonuses from '@/components/YourBonuses';
import { AuthLoading, SignedIn, SignedOut } from '@daveyplate/better-auth-ui';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div className="flex flex-col gap-10">
      <AuthLoading>
        <Spinner />
      </AuthLoading>

      <SignedIn>
        <YourBonuses user={session?.user || null} />
      </SignedIn>
      <SignedOut>
        <div className="text-xs">
          <p>
            You need to <Link href="/auth/sign-in">sign in</Link> or{' '}
            <Link href="/auth/sign-up">register</Link> to see your active
            transfer bonuses!
          </p>
        </div>
      </SignedOut>
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
