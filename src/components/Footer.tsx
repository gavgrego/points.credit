import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-xs flex justify-center flex-col gap-2 items-center pt-20 pb-8">
      <div className="text-muted-foreground">
        Built by{' '}
        <a
          target="_blank"
          href="https://gregorygav.in"
          rel="noopener noreferrer"
        >
          Gav
        </a>{' '}
        in the{' '}
        <a
          href="https://gavgavgav.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bay Area
        </a>
      </div>
      <div className="text-muted-foreground text-xs text-center">
        See incorrect data? Please email{' '}
        <a href="mailto:gavin@thecomponent.studio">gavin@thecomponent.studio</a>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <a
          href="https://ko-fi.com/Z8Z6C8DK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={115}
            height={28}
            style={{ border: '0px', height: '28px' }}
            src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>

        <Link href="/referrals" className="underline">
          or use my referral links!
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
