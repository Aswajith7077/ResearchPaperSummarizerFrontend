import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { API_ENDPOINTS } from "@/constants/api.endpoint";
import { REQUEST_METHODS } from "@/constants/api.enum";
import { appname } from "@/constants/company.const";
import { SigninFormSchema } from "@/data/auth.data";
import { useApiMutation } from "@/hooks/useApiService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const FormComponent = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useApiMutation(
        API_ENDPOINTS.SIGNIN_ENDPOINT,
        REQUEST_METHODS.POST
    );
    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema)
    });

    const onSubmit = (values: z.infer<typeof SigninFormSchema>) => {
        console.log(values);

        const request = {
            username: values.username,
            fullname: values.fullname,
            password: values.confirm_password,
            email: values.email
        };

        mutate(request, {
            onSuccess: response => {
                // toast("Sign In Successful")
                console.log(response);
                navigate("login");
            },
            onError: error => {
                toast("Sign In Failed", {
                    description: error.message
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-between w-full lg:w-1/2 border bg-gray-950 py-20"
            >
                <div className="flex flex-row w-full px-20 lg:px-[22%] justify-end">
                    <Button
                        variant={"ghost"}
                        className="cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </div>
                <div className="flex flex-col px-20 lg:px-[22%] gap-4 w-full">
                    <h2 className="font-semibold text-3xl w-full">Create Your Account</h2>
                    <p className="w-full mb-5 text-gray-400 text-sm">
                        Enter your credentials
                    </p>
                    <FormField
                        name={"email"}
                        control={form.control}
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        className="bg-gray-900 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />

                    <FormField
                        name={"fullname"}
                        control={form.control}
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Fullname"
                                        type="name"
                                        className="bg-gray-900 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />

                    <FormField
                        name={"username"}
                        control={form.control}
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        type="name"
                                        className="bg-gray-900 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />

                    <FormField
                        name={"new_password"}
                        control={form.control}
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="New Password"
                                        type="password"
                                        className="bg-gray-900 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />

                    <FormField
                        name={"confirm_password"}
                        control={form.control}
                        render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="bg-gray-900 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>}
                    />

                    <Button
                        variant={"default"}
                        disabled={isPending}
                        className="rounded-lg text-base mt-3 cursor-pointer py-6 w-full"
                    >
                        {isPending ? "Signing In..." : "Sign in"}
                    </Button>
                    <div className="flex flex-row items-center px-2 w-full">
                        <div className="hidden md:inline border-gray-400 w-1/3 border h-0" />
                        <Label className="text-center w-full md:w-1/3 my-3 justify-center">
                            Or Continue With
                        </Label>
                        <div className="hidden md:inline w-1/3 border-gray-400 border h-0" />
                    </div>
                    <Button variant={"outline"} className="py-5 w-full  cursor-pointer">
                        Continue with Google
                    </Button>
                </div>

                <div className="flex flex-row w-full justify-center ">
                    <Button
                        variant={"link"}
                        className="text-sm text-gray-400 cursor-pointer"
                    >
                        Privacy
                    </Button>
                    <Button
                        variant={"link"}
                        className="text-sm text-gray-400 cursor-pointer"
                    >
                        Terms and Conditions
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const SignIn = () => {
    document.body.classList.add("dark");
    return (
        <main className="flex flex-row w-screen h-screen bg-gray-900">
            <FormComponent />
            <div className="hidden lg:flex flex-col justify-between lg:w-1/2 p-15">
                <h2 className="text-2xl font-semibold ">{appname}</h2>
                <p className="font-semibold text-lg">
                    This library has saved me countless hours of work and helped me
                    deliver stunning designs to my clients faster than ever before.
                </p>
            </div>
            <Toaster />
        </main>
    );
};

export default SignIn;
