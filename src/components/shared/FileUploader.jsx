import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

const FileUploader = ({ fieldChange, mediaUrl, resetFile, setResetFile }) => {
	console.log(resetFile);
	const [file, setFile] = useState("");
	const [fileUrl, setFileUrl] = useState(mediaUrl);

	useEffect(() => {
		if (resetFile) {
			setFile(null);
			setFileUrl(null);
			setResetFile(false);
		}
	}, [resetFile]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			// Do something with the files
			setFile(acceptedFiles);
			fieldChange(acceptedFiles);
			setFileUrl(URL.createObjectURL(acceptedFiles[0]));
		},
		[file]
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
	});

	return (
		<div
			{...getRootProps()}
			className='flex flex-center flex-col bg-secondary rounded-xl cursor-pointer'
		>
			<input {...getInputProps()} className='cursor-pointer' />
			{fileUrl ? (
				<>
					<div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
						<img
							src={fileUrl}
							alt='image'
							className='file_uploader-box '
						/>
					</div>
					<p className='file_uploader-label'>
						Click or drag photo to replace
					</p>
				</>
			) : (
				<div className='file_uploader-box'>
					<img
						src='/assets/icons/file-upload.svg'
						width={96}
						height={77}
						alt='file-upload'
						className=' '
					/>
					<h3 className='base-medium text-muted-foreground mb-2 mt-6'>
						Drag photo here
					</h3>
					<p className='mb-6 text-accent small-regular '>
						SVG, PNG, JPG
					</p>
					<Button
						className='text-bold text-muted-foreground'
						variant='outline'
					>
						Select from device
					</Button>
				</div>
			)}
		</div>
	);
};

export default FileUploader;
