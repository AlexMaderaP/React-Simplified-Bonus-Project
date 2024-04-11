import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useSubmit } from "react-router-dom";
import { signupSchema } from "@backend/constants/schemas/users";

type SignupFormValues = z.infer<typeof formSchema>;

type SignupFormProps = {
  initialValues?: SignupFormValues;
};

const formSchema = signupSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

const DEFAULT_VALUES: SignupFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignupForm({
  initialValues = DEFAULT_VALUES,
}: SignupFormProps) {
  const submit = useSubmit();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(e: React.FormEvent) {
    const isValid = await form.trigger();
    e.preventDefault();
    if (isValid) {
      const { email, password } = form.getValues();
      submit(
        { email, password },
        {
          method: "post",
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => onSubmit(e)}>
        <Card className="w-96 ">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost" asChild>
              <Link to="/tasks">Cancel</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button type="submit">Sign up</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
