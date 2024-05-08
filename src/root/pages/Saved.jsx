import GridPostList from "@/components/shared/GridPostList"
import Loader from "@/components/shared/Loader"
import SavedPostList from "@/components/shared/SavedPostList"
import postServices from "@/lib/appwrite/post_services"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Saved = () => {
  const {userData} = useSelector((state)=>state.auth)
  const [isSearching,setIsSearchig] =useState(true)
  const [savedPostList,setSavedPostList]=useState([])
  useEffect(()=>{
    const getSavedPost=async ()=>{

      try {
        setIsSearchig(true)
        const postList = await postServices.getSavedPost(userData?.$id)
        console.log(postList)
        setSavedPostList(postList?.documents)
      } catch (error) {
        console.log(error)
      }finally{
        setIsSearchig(false)
      }
    }
    getSavedPost()

  },[userData?.$id])

  return (

    <div className="saved-container">
      
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
      <h2 className='body-bold md:h3-bold'>Saved Post</h2>
      <div className='flex-center gap-3 bg-secondary rounded-xl px-4 py-2 cursor-pointer'>
        <p className='small-medium md:base-medium text-foreground'>
          All
        </p>
        <img
          src='/assets/icons/filter.svg'
          alt='filter'
          width={20}
          height={20}
        />
      </div>
    </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {(savedPostList?.length >0) && (<SavedPostList savedList={savedPostList}/>)}
      </div>
      <div className=" w-full mx-auto">
      {isSearching && <Loader/>}
      </div>
    </div>
  )
}

export default Saved