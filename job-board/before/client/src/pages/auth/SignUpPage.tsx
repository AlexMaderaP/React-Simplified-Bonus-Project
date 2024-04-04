import { CenterContainer, SignupForm } from "@/features/authentication";

export function SignUpPage() {
  return (
    <CenterContainer>
      <SignupForm onSubmit={() => console.log("submitted")} />
    </CenterContainer>
  );
}
