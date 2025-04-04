import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { client } from '@/sanity/client';
import { ALL_ACTIVE_BONUSES_QUERY } from '@/sanity/queries';
import { type SanityDocument } from 'next-sanity';

const options = { next: { revalidate: 30 } };

const CurrentBonuses = async () => {
  const bonuses = await client.fetch<SanityDocument[]>(
    ALL_ACTIVE_BONUSES_QUERY,
    { today: new Date().toISOString() },
    options
  );

  return (
    <div className="w-full relative space-y-6">
      <h2 className="text-3xl font-bold text-foreground">
        All Current Transfer Bonuses
      </h2>

      {bonuses.length === 0 ? (
        <p className="text-muted-foreground">
          No active transfer bonuses at this time.
        </p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Base Ratio</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonuses.map((bonus) => (
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
      )}
    </div>
  );
};

export default CurrentBonuses;
