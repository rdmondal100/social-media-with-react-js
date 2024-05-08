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
import authService from "@/lib/appwrite/auth_services";
import { signUpValidation } from "@/lib/validation";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import useCheckAuthUser from "@/hooks/useCheckAuthUser";

const SignUpForm = () => {
	const navigate = useNavigate();
	const {checkAuthUser} =useCheckAuthUser();

	const { toast } = useToast();
  const [isCreating,setIsCreating]=useState(false)

	const form = useForm({
		resolver: zodResolver(signUpValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(userData) {
		try {
			setIsCreating(true)
			const newUser = await authService.createUserAccount(userData);
      console.log(newUser.response)
			if (newUser?.$id) {
				const session = await authService.signIn({
					email: userData.email,
					password: userData.password,
				});
				console.log(session)
				if (session && checkAuthUser()) {

					navigate("/")
					form.reset();
					toastMessage(
						"success",
						"Wellcome!🤗",
						"Wellcome to GreyBook!"
					);
				} else {
					toastMessage(
						"destructive",
						"Failed☹️",
						"Sign in failed. Please try again"
					);
				}
			} else if (newUser?.response?.code === 409) {
				toastMessage(
					"destructive",
					"Failed☹️",
					"An account with the same email already exists, Please try with different email"
				);
			}else if(newUser?.response?.code ===429){
				toastMessage(
					"destructive",
					"Too Many Request!",
					"Please try again later"
				)
			}
			
		} catch (error) {
			console.error("Failed to create newUser", error);
			toastMessage(
				"destructive",
				"Failed☹️",
				"An unexpected error occurred. Please try again"
			);
		}finally{
			setIsCreating(false)
		}
	}

	const toastMessage = (variant, title, description) => {
		toast({
			variant,
			title,
			description,
			action: <ToastAction altText='toastmessage'>{`${variant!=='success'?" Try Again":"OK"}`}</ToastAction>,
		});
	};

	const formFields = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "username", label: "Username", type: "text" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
	];

	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col'>
				<img src='/assets/images/logo.svg' alt='logo' className="w-48 lg:w-60 mt-2" />

				<h2 className='h3-bold md:h2-bold pt-5 sm:pt-5'>
					Create a new account
				</h2>
				<p className='text-slate-300 small-medium md:base-regular mt-2'>
					To use GreyBook, please enter your details
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
						{isCreating ? (
							<div className='flex-center gap-2'>
								<Loader /> Loading...
							</div>
						) : (
							"Sign up"
						)}
					</Button>

					<p className='text-small-regular text-light-2 text-center mt-2'>
						Already have an account?{" "}
						<Link className='text-primary' to='/sign-in'>
							Login
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignUpForm;
