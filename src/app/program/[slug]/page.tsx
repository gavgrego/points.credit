import BankTransferPartners from '@/components/BankTransferPartners';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const programSlugs: Record<string, string> = {
  'american-express': 'American Express',
  chase: 'Chase',
  'capital-one': 'Capital One',
  citi: 'Citi',
  bilt: 'Bilt',
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programName = programSlugs[slug];

  if (!programName) {
    return {
      title: 'Program Not Found',
    };
  }

  return {
    title: `${programName} Transfer Partners`,
    description: `Complete list of ${programName} transfer partners including transfer ratios and current transfer bonuses.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(programSlugs).map((slug) => ({
    slug,
  }));
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  if (!programSlugs[slug]) {
    notFound();
  }

  return (
    <main className="container py-8">
      <BankTransferPartners slug={slug} />
    </main>
  );
}
