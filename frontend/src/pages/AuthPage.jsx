import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "@heroui/react";

function AuthPage() {
  return (
    <div className="w-full h-dvh flex items-center justify-center flex-col gap-3">
      {/* <Button children={<SignInButton type="modal" />} /> */}

      <h2 className="text-3xl font-medium2">iChat</h2>
      <p className="mb-12">Login Or Signup</p>
      <div className="flex items-center gap-12">
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign Up</Button>
        </SignUpButton>
      </div>
    </div>
  );
}

export default AuthPage;
