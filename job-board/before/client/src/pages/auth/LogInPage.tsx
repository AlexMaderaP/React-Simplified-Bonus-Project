import { CenterContainer, LoginForm } from "@/features/authentication";

export function LogInPage() {
  return (
    <CenterContainer>
      <LoginForm onSubmit={() => console.log("Submitted")} />
    </CenterContainer>
  );
}
