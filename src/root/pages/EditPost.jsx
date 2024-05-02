import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import postServices from "@/lib/appwrite/post_services";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const {id} = useParams()
  console.log(id)

  const [post,setPost]=useState('')
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const refresh=async ()=>{
      setLoading(true)
      const data = await postServices.getPostById(id || '')
      console.log(data)
      setPost(data)
      setLoading(false)
    }
    refresh()
  },[id])
  return (
    <section className=" flex flex-1 ">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <BiImageAdd className="text-5xl"/>
        <h2 className=" h3-bold md:h2-bold text-left w-full">Edit Post</h2>
      </div>
      {loading?(<Loader/>):(<PostForm action = "Update" post={post}/>)}
    </div>
</section>
  )
}

export default EditPost