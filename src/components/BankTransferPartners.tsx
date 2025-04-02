import { client } from '@/sanity/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';

const options = { next: { revalidate: 30 } };

const BANK_TRANSFER_PARTNERS_QUERY = `*[_type == "bank" && slug.current == $slug][0]{
  name,
  image,
  "imageUrl": image.asset->url,
  "transferPartners": transferPartner[]{
    "partnerName": partner->name,
    "partnerType": partner->_type,
    "partnerAlliance": partner->alliance,
    "baseTransferRatio": coalesce(transferRatio, "1:1"),
    "activeBonus": *[
      _type == "transferBonus" && 
      references(^.partner->_id) && 
      references(^.^._id) &&
      startDate < endDate
    ] | order(startDate desc)[0]{
      startDate,
      endDate,
      bonusRatio
    }
  }
}`;

const isActiveBonus = (bonus: SanityDocument) => {
  if (!bonus) return false;
  const now = new Date();
  const startDate = new Date(bonus.startDate);
  const endDate = new Date(bonus.endDate);
  return startDate <= now && endDate >= now;
};

const BankTransferPartners = async ({ slug }: { slug: string }) => {
  const bank = await client.fetch<SanityDocument>(
    BANK_TRANSFER_PARTNERS_QUERY,
    { slug },
    options
  );

  if (!bank) {
    return (
      <div className="text-muted-foreground">
        Bank not found or no transfer partners available.
      </div>
    );
  }

  const airlinePartners = bank.transferPartners.filter(
    (partner: SanityDocument) => partner.partnerType === 'airline'
  );
  const hotelPartners = bank.transferPartners.filter(
    (partner: SanityDocument) => partner.partnerType === 'hotel'
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        {bank.image && (
          <Image
            src={bank.imageUrl}
            width={50}
            height={50}
            alt={bank.name}
            className="rounded-lg"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{bank.name} Transfer Partners</h1>
          <p className="text-muted-foreground mt-2">
            Current transfer ratios and active bonuses
          </p>
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
                <TableHead>Base Ratio</TableHead>
                <TableHead>Current Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airlinePartners.map((partner: SanityDocument) => {
                const active = isActiveBonus(partner.activeBonus);
                return (
                  <TableRow key={partner.partnerName}>
                    <TableCell className="font-medium">
                      {partner.partnerName}
                    </TableCell>
                    <TableCell>{partner.partnerAlliance || '-'}</TableCell>
                    <TableCell>
                      {active ? (
                        <span className="line-through">
                          {partner.baseTransferRatio}
                        </span>
                      ) : (
                        partner.baseTransferRatio
                      )}
                    </TableCell>
                    <TableCell>
                      {active ? (
                        <span className="text-green-500 font-bold">
                          {partner.activeBonus.bonusRatio}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {active ? partner.activeBonus.endDate : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
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
                <TableHead>Base Ratio</TableHead>
                <TableHead>Current Bonus</TableHead>
                <TableHead>Valid Until</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelPartners.map((partner: SanityDocument) => {
                const active = isActiveBonus(partner.activeBonus);
                return (
                  <TableRow key={partner.partnerName}>
                    <TableCell className="font-medium">
                      {partner.partnerName}
                    </TableCell>
                    <TableCell>
                      {active ? (
                        <span className="line-through">
                          {partner.baseTransferRatio}
                        </span>
                      ) : (
                        partner.baseTransferRatio
                      )}
                    </TableCell>
                    <TableCell>
                      {active ? (
                        <span className="text-green-500 font-bold">
                          {partner.activeBonus.bonusRatio}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {active ? partner.activeBonus.endDate : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default BankTransferPartners;
