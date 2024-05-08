import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import postServices from '@/lib/appwrite/post_services'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const {id} = useParams()
  const [userInfo, setUserInfo] = useState([])
  const [isSearching,setIsSearchig] = useState(true)
  console.log(id)

  useEffect(()=>{

    const getUserInfo = async ()=>{
      try {
        setIsSearchig(true)
        const userInfo = await postServices.getUserInfo(id)
        console.log(userInfo)
        if(!userInfo){
          console.log("Error getting user info on the profile page")
        }

        setUserInfo(userInfo)
      } catch (error) {
        console.log(error)
      }finally{
        setIsSearchig(false)
      }
    }
    getUserInfo()
  },[id])
  return (
    <div className='profile-container'>
      <div className="profile-details w-full flex gap-x-5">
        <div className="profile-image">
          <img src={userInfo?.imageUrl ||
							"/assets/icons/profile-placeholder.svg"} width={75} height={75} alt="profile" className='rounded-full' />
        </div>
        <div className="info flex flex-col ">
          <div className="identity flex flex-col">
          <span className=' text-xl font-bold lg:text-3xl'>
          {userInfo?.name}
          </span>
          <span className=' text-muted-foreground'>
          {userInfo?.username}
          </span>

          </div>
          <div className="posts mt-2">
          {userInfo?.posts?.length}<span className=' text-primary'> Posts</span> 
          </div>
          <div className="bio mt-4 w-52">
            {userInfo?.bio}
          </div>
        </div>
      </div>
      <div className='all flex-between w-full max-w-5xl mt-16 mb-7'>
      <h2 className='body-bold md:h3-bold'>All Posts</h2>
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
  

      <div className="posts">
            {userInfo?.posts && (<GridPostList postList={userInfo?.posts} showuser={false} />)}
      </div>
      {userInfo.name}
      {isSearching && (<Loader/>)} 
      </div>
  )
}

export default Profile 