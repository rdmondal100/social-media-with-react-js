import PostForm from "@/components/forms/PostForm";
import { BiImageAdd } from "react-icons/bi";

const CreatePost = () => {
  return (
    <section className=" flex flex-1 ">
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <BiImageAdd className="text-5xl"/>
            <h2 className=" h3-bold md:h2-bold text-left w-full">Create Post</h2>
          </div>
          <PostForm action="Creat"/>
        </div>
    </section>
  )
}

export default CreatePost