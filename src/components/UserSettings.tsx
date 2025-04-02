'use client';

import { SignedIn, SignedOut, UserAvatar } from '@daveyplate/better-auth-ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { authClient } from '@/auth-client';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { useRouter } from 'next/navigation';

const UserSettings = () => {
  const { data } = authClient.useSession();
  const { signOut } = authClient;
  const router = useRouter();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <UserAvatar user={data?.user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <SignedIn>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/settings">⚙️ Settings</Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/');
                    },
                  },
                })
              }
            >
              Sign out
            </DropdownMenuItem>
          </SignedIn>
          <SignedOut>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/auth/sign-in">Sign In</Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/auth/sign-up">Sign Up!</Link>
            </DropdownMenuItem>
          </SignedOut>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserSettings;
