import {
  ChangePasswordCard,
  RedirectToSignUp,
  SignedIn,
} from '@daveyplate/better-auth-ui';

const SettingsPage = () => {
  return (
    <div>
      <RedirectToSignUp />

      <SignedIn>
        <div className="flex flex-col gap-6">
          <ChangePasswordCard />
        </div>
      </SignedIn>
    </div>
  );
};

export default SettingsPage;
