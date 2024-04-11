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
import { loginSchema } from "@backend/constants/schemas/users";
import { Link } from "react-router-dom";

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  initialValues?: LoginFormValues;
  onSubmit: (LoginInfo: LoginFormValues) => void;
};

const DEFAULT_VALUES: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm({
  initialValues = DEFAULT_VALUES,
  onSubmit,
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-96 ">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
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
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost" asChild>
              <Link to="/tasks">Cancel</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
            <Button type="submit">Log In</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
