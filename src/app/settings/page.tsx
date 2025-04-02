import {
  ChangePasswordCard,
  RedirectToSignUp,
  SignedIn,
} from '@daveyplate/better-auth-ui';
import { client } from '@/sanity/client';
import { type SanityDocument } from 'next-sanity';
import CreditCardChoices from '@/components/CreditCardChoices';

const BANKS_QUERY = `*[_type == "bank"]{ _id, name, description, image }`;

const options = { next: { revalidate: 30 } };

const SettingsPage = async () => {
  const banks = await client.fetch<SanityDocument[]>(BANKS_QUERY, {}, options);
  return (
    <div>
      <RedirectToSignUp />

      <SignedIn>
        <div className="flex flex-col gap-6">
          <CreditCardChoices banks={banks} />
          <ChangePasswordCard />
        </div>
      </SignedIn>
    </div>
  );
};

export default SettingsPage;
