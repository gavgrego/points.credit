'use client';

import { authClient } from '@/auth-client';
import { type SanityDocument } from 'next-sanity';
import { useState } from 'react';
import { Spinner } from './Spinner';

const CreditCardChoices = ({ banks }: { banks: SanityDocument[] }) => {
  const [isPending, setIsPending] = useState(false);
  const { data } = authClient.useSession();
  const cards = Object.values(data?.user.cards || {});

  const handleToggle = async (id: string) => {
    const updatedCards = cards.includes(id)
      ? cards.filter((card) => card !== id)
      : [...cards, id];

    setIsPending(true);
    await authClient.updateUser({
      cards: { ...updatedCards },
    });
    setIsPending(false);
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold mb-4">Select Credit Cards</h2>
      <p>
        Choose which credit cards you have to dynamically see what bonuses you
        have access to.
      </p>
      <div className="space-y-2">
        {banks.map((bank) => (
          <label
            key={bank._id}
            className="flex items-center space-x-3 p-2 cursor-pointer"
          >
            {isPending ? (
              <Spinner className="h-5 w-5" />
            ) : (
              <input
                type="checkbox"
                checked={cards.includes(bank._id)}
                onChange={() => handleToggle(bank._id)}
                className="h-5 w-5 rounded border-gray-300 text-foreground focus:ring-blue-500"
              />
            )}
            <span className="text-foreground">
              {bank.name}{' '}
              {bank.description && (
                <span className="text-muted-foreground">
                  ({bank.description})
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CreditCardChoices;
