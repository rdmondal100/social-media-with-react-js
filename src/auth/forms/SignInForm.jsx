import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { signInValidation } from "@/lib/validation";
import { ToastAction } from "@/components/ui/toast";

import useCheckAuthUser from "@/hooks/useCheckAuthUser";
import authService from "@/lib/appwrite/auth_services";
import { useState } from "react";

const SignInForm = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isSigningIn,setIsSigningIn] = useState(false)
	
	const {checkAuthUser} = useCheckAuthUser();


	const form = useForm({
		resolver: zodResolver(signInValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});


	async function onSubmit(userData) {
		try {
			setIsSigningIn(true)
			const session = await  authService.signIn({
				email: userData.email,
				password: userData.password,
			});
			console.log(session);
			if (session.$id) {
				checkAuthUser()
				setIsSigningIn(false)
				navigate("/");
				form.reset();
				toastMessage("success", "Wellcome!🤗", "Wellcome to GreyBook!");


			} else if (session?.response?.code === 429) {
				setIsSigningIn(false)
				toastMessage(
					"destructive",
					"Too Many Request!",
					"Please try again later"
				);
			} else if (session?.response?.code === 401) {
				setIsSigningIn(false)
				toastMessage(
					"destructive",
					"Wrong Email or Password",
					"Please try again"
				);
			} else {
				setIsSigningIn(false)
				toastMessage(
					"destructive",
					"Failed☹️",
					"Sign in failed. Please try again"
				);
			}
		} catch (error) {
			setIsSigningIn(false)
			console.error("Failed to sign in", error);
			toastMessage(
				"destructive",
				"Failed☹️",
				"An unexpected error occurred. Please try again"
			);
		}
	}

	const toastMessage = (variant, title, description) => {
		toast({
			variant,
			title,
			description,
			action: (
				<ToastAction altText='toastmessage'>{`${
					variant !== "success" ? " Try Again" : "OK"
				}`}</ToastAction>
			),
		});
	};

	const formFields = [
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
	];

	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col'>
				<img src='/assets/images/logo.svg' alt='logo' />

				<h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
					Log in to your account
				</h2>
				<p className=' text-slate-300 small-medium md:base-regular mt-2'>
					Wellcome back, please enter your details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full mt-4'
				>
					{formFields.map((item) => (
						<FormField
							key={item.name}
							control={form.control}
							name={item.name}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{item.label}</FormLabel>
									<FormControl>
										<Input
											type={item.type}
											{...field}
											className='shad-input'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button type='submit'>
						{isSigningIn ? (
							<div className='flex-center gap-2'>
								<Loader /> Loading...
							</div>
						) : (
							"Log in"
						)}
					</Button>

					<p className='text-small-regular text-light-2 text-center mt-2'>
						Don't have an account?{" "}
						<Link className='text-primary' to='/sign-up'>
							Sing Up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignInForm;
