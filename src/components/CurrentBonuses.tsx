'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { transferPartners } from '@/data/transferPartners';
import Image from 'next/image';

const CurrentBonuses = () => {
  const bonuses =
    transferPartners?.flatMap((program) =>
      program.partners
        .filter((partner) => partner.bonus)
        .map((partner) => ({
          name: partner.name,
          source: program.source,
          bank: program.name,
          originalRatio: partner.transferRatio,
          bonus: partner.bonus,
          validUntil: partner.bonusUntil,
          bonusPercent: partner.bonusPercent,
        }))
    ) ?? [];

  return (
    <div className="w-full relative space-y-6">
      <h2 className="text-3xl font-bold text-foreground">
        Current or Recent Transfer Bonuses
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
                <TableHead>Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {bonuses.map((bonus) => (
                <TableRow key={`${bonus.bank}-${bonus.name}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Image
                        src={bonus.source}
                        width={25}
                        height={25}
                        alt={bonus.bank}
                      />
                      <span>{bonus.bank}</span>
                    </div>
                  </TableCell>
                  <TableCell>{bonus.name}</TableCell>
                  <TableCell className="text-green-500 font-bold">
                    {bonus.bonus}{' '}
                    {bonus.bank !== 'Bilt' && (
                      <span className="text-xs">({bonus.bonusPercent}%)</span>
                    )}
                  </TableCell>
                  <TableCell>{bonus.validUntil}</TableCell>
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
