import { z } from "zod";

const SignupForm = () => {
  const signupSchema = z.object(
    {
      firstName: z.string()
        .min(2, "First name is required and must be at least 2 characters long")
        .max(30, "First name is too long, please shorten to under 30 characters"),
      lastName: z.string()
        .min(2, "Last name is required and must be at least 2 character long")
        .max(30, "Last name too long, please shorten to under 30 characters."),
      email: z.email()
        .trim(),
      password: z.string()
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z.string(),
    }
  ).refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

  type signupForm = z.infer<typeof signupSchema>;
  
  return (
    <div>SignupForm</div>
  )
}

export default SignupForm

