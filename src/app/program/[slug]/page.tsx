import { Card } from '@/components/ui/card';
import { TransferPartner } from '@/types';
import { transferPartners } from '@/data/transferPartners';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Metadata } from 'next';
import Image from 'next/image';

const programSlugs: Record<string, string> = {
  'american-express': 'American Express',
  chase: 'Chase',
  'capital-one': 'Capital One',
  citi: 'Citi',
  bilt: 'Bilt',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programName = programSlugs[slug];
  const program = transferPartners.find((p) => p.name === programName);

  if (!program) {
    return {
      title: 'Program Not Found',
    };
  }

  return {
    title: `${program.name} ${program.pointsName} Transfer Partners`,
    description: `Complete list of ${program.name} ${program.pointsName} transfer partners including transfer ratios and current transfer bonuses.`,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programName = programSlugs[slug];
  const program = transferPartners.find((p) => p.name === programName);

  if (!program) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
        <p>The credit card program you are looking for does not exist.</p>
      </div>
    );
  }

  const airlinesPartners = program.partners.filter(
    (partner: TransferPartner) => partner.category === 'Airlines'
  );
  const hotelsPartners = program.partners.filter(
    (partner: TransferPartner) => partner.category === 'Hotels'
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Image
          src={program.source}
          alt={program.name}
          width={80}
          height={80}
          className="object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{program.name}</h1>
          <p className="text-xl text-muted-foreground">
            {program.pointsName} Transfer Partners
          </p>

          <p className="text-lg mb-8">
            Transfer your {program.pointsName} to the following partners:
          </p>

          {program.warning && (
            <p className="text-sm mb-8 text-muted-foreground max-w-prose">
              ❗ {program.warning}
            </p>
          )}
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Airline Partners</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Alliance</TableHead>
                <TableHead>Transfer Ratio</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airlinesPartners.map((partner: TransferPartner) => (
                <PartnerRow key={partner.name} partner={partner} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Hotel Partners</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Transfer Ratio</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelsPartners.map((partner: TransferPartner) => (
                <PartnerRow
                  key={partner.name}
                  partner={partner}
                  isHotel={true}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function PartnerRow({
  partner,
  isHotel = false,
}: {
  partner: TransferPartner;
  isHotel?: boolean;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{partner.name}</TableCell>
      {!isHotel && <TableCell>{partner.alliance || '-'}</TableCell>}
      <TableCell>
        {partner.bonus ? (
          <span className="line-through">{partner.transferRatio}</span>
        ) : (
          partner.transferRatio
        )}
      </TableCell>
      <TableCell>
        {partner.bonus ? (
          <span className="text-green-500 font-bold">
            {partner.bonus}
            {partner.bonusPercent && (
              <span className="text-xs"> ({partner.bonusPercent}%)</span>
            )}
          </span>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{partner.bonusUntil ? partner.bonusUntil : '-'}</TableCell>
    </TableRow>
  );
}
