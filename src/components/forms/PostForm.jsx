import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { postValidation } from "@/lib/validation";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";
import { useState } from "react";
import postServices from "@/lib/appwrite/post_services";

const PostForm = ({ post, action }) => {

	const { userData } = useSelector((state) => state.auth);
	const { toast } = useToast();
	const navigate = useNavigate();
  const [cancel,setCancel]=useState(false)
	const [isPosting,setIsPosting]=useState(false)
	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(postValidation),
		defaultValues: {
			caption: post? post?.caption : "",
			file: [],
			location: post ? post?.location : "",
			tags: post ? post?.tags?.join(",") : "",
		},
	});
	// 2. Define a submit handler.
	async function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsPosting(true)

		//update post

		if(post && action === 'Update'){
			console.log("Tring to update the post")
			console.log(post)
			const updatedPost =await postServices.updatePost({
				...values,
			postId:post?.$id,
			imageId: post?.imageId,
			imageUrl: post?.imageUrl,
		})
		console.log(updatedPost)
		if(!updatedPost){
			toast({ variant:"destructive",title:"Failed to update!",description:"Please try again"})
		}
		setIsPosting(false)
		return navigate(`/post/${post.$id}`)
		}else{
			const post ={
				...values,
				userId: userData?.$id,
			}
		
			const newPost = await postServices.createPost({post});
			console.log(newPost);
	
			if (!newPost) {
				setIsPosting(false)
				toast({
					title: "Please try again",
				});
			}
	
			form.reset()
			setIsPosting(false)
			navigate('/')
	
			console.log(values);
		}
  
	}

  //handle cancelbtn
  const handleCancelBtn=()=>{
    form.reset()
    setCancel(true)
		setIsPosting(false)
  }
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=' flex flex-col gap-9 w-full max-w-5xl'
			>
				<FormField
					control={form.control}
					name='caption'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Caption
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Write your  caption here ...'
									className='shad-textarea custom-scrollbar '
									{...field}
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Photos
							</FormLabel>
							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
                  resetFile={cancel}
                  setResetFile={setCancel}
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Location
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='shad-input'
									{...field}
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>
								Add Tags (separated by comma " , ")
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='shad-input'
									placeholder='Art, React, Entertainment'
									{...field}
								/>
							</FormControl>

							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<div className='flex item-center justify-end  gap-4'>
					<Button
						type='button'
						variant='outline'
						className='shad-button_secondary'
            onClick={handleCancelBtn}
					>
						Cancel
					</Button>

				
						<Button type='submit' className="flex gap-x-1" disabled={isPosting}>
						{isPosting && <Loader className=" max-w-5 "/>}	{action} Post
						</Button>
				
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
