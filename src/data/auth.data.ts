import { z } from "zod";

const LoginFormSchema = z.object({
    username: z.string().min(5).max(20),
    password: z.string().min(10).max(18)
});

const SigninFormSchema = z
    .object({
        email: z
            .string()
            .min(1, "Should not be empty")
            .email("Invalid email address"),
        fullname: z.string().min(5).max(30),
        username: z.string().min(5).max(20),
        new_password: z.string().min(10).max(18),
        confirm_password: z.string().min(10).max(18)
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Password Does not Match",
        path: ["confirm_password"]
    });

export { LoginFormSchema, SigninFormSchema };
