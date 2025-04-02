import { User } from '@/auth';
import { client } from '@/sanity/client';
import { CURRENT_BONUSES_QUERY } from '@/sanity/queries';
import { type SanityDocument } from 'next-sanity';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';

const options = { next: { revalidate: 30 } };

const YourBonuses = async ({ user }: { user: User | null }) => {
  const userCards = Object.values(user?.cards || {});

  const currentBonuses = await client.fetch<SanityDocument[]>(
    CURRENT_BONUSES_QUERY,
    {
      today: new Date().toISOString(),
      bankIds: userCards.map((card) => card),
    },
    options
  );

  if (currentBonuses.length === 0) {
    return (
      <div className="text-foreground">
        <h2 className="text-2xl font-bold mb-4">
          Your Current Transfer Bonuses
        </h2>
        <p>
          Edit cards you hold in{' '}
          <Link href="/settings" className="text-xs">
            settings
          </Link>
        </p>
        <p className="text-muted-foreground">
          No active transfer bonuses at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="text-foreground">
      <h2 className="text-2xl font-bold mb-4">Your Current Transfer Bonuses</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Base Ratio</TableHead>
              <TableHead>Bonus %</TableHead>
              <TableHead>Valid Until</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBonuses.map((bonus) => (
              <TableRow key={bonus._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {bonus.bankImage && (
                      <Image
                        src={bonus.bankImageUrl}
                        width={25}
                        height={25}
                        alt={bonus.bankName}
                      />
                    )}
                    <span>{bonus.bankName}</span>
                  </div>
                </TableCell>
                <TableCell>{bonus.partnerName}</TableCell>
                <TableCell>
                  <span className="line-through">
                    {bonus.baseTransferRatio}
                  </span>
                </TableCell>
                <TableCell className="text-green-500 font-bold">
                  {bonus.bonusRatio}
                </TableCell>
                <TableCell>{bonus.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs mt-2">
        Edit cards you hold in <Link href="/settings">settings</Link>
      </p>
    </div>
  );
};

export default YourBonuses;
