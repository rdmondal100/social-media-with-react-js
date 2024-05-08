import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import useDebounceGetPost from "@/hooks/useDebounceGetPost";
import postServices from "@/lib/appwrite/post_services";
import { useEffect, useState, useRef } from "react";

const Explore = () => {
	const [postDoc, setPostDoc] = useState([]);
	const [loading, setLoading] = useState(true);
	const [lastPostId, setLastPostId] = useState("");
	const [fetching, setFetching] = useState(false);
  const [allCaughtUp, setAllCaughtUp] = useState(false);

	const lastPostIdRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue,500)
  const [searchedPost,setSearchedPost]= useState([]);
  const [isSearching,setIsSearchig] = useState(false)

  //search functionality
    const handleSearchOnChange=async (e)=>{
      setIsSearchig(true)
    setSearchValue(e.target.value)

  }


  useEffect(()=>{
    const getSearchPosts = async ()=>{
      try {
        setIsSearchig(true)

        if(debouncedValue){
          const data = await postServices.searchPosts(debouncedValue)
          console.log(data)
          setSearchedPost(data)
          if(data.documents.length ==0){
            setAllCaughtUp(false)
          }
      }
      } catch (error) {
          console.log(error)
      }finally{
          setIsSearchig(false)
      }
 
    }
    getSearchPosts();

  },[debouncedValue])




	useEffect(() => {
		lastPostIdRef.current = lastPostId; 
	}, [lastPostId]);

	useEffect(() => {
		const fetchInitialPost = async () => {
			try {
				const initialPost = await postServices.getInfinitePosts();
				setLastPostId((id) => {
					if (initialPost?.documents?.length) {
						const newLast =
							initialPost?.documents[
								initialPost?.documents.length - 1
							]?.$id;
						return newLast;
					}
					return id;
				});
				setPostDoc(initialPost.documents);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

    
		fetchInitialPost();
	}, []);



	const handleScroll = async () => {
		setLoading(true);
		try {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = document.documentElement.scrollTop;
			const clientHeight = document.documentElement.clientHeight;

			if (
				!fetching && !allCaughtUp &&
				lastPostIdRef.current &&
				Math.floor(scrollTop + clientHeight) >=
					Math.floor(scrollHeight - 300)
			) {
				setFetching(true);
				const getMorePost = await postServices.getInfinitePosts(
					lastPostIdRef.current
				);
        if (getMorePost?.documents?.length === 0) {
          setAllCaughtUp(true); 
        } else {
          setLastPostId(
            getMorePost?.documents[getMorePost?.documents.length - 1]?.$id
          );}

				setFetching(false);

				console.log(postDoc);
				setPostDoc((prevPosts) => [
					...prevPosts,
					...getMorePost.documents,
				]);
				console.log(getMorePost);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

  const debouncedScroll = useDebounceGetPost(handleScroll, 100);


  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll); 
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  const showSearchResults = searchValue !=='';
    const showPosts = !showSearchResults && (postDoc?.length !==0)
	return (
    <div className='explore-container'>
    <div className='explore-inner_container'>
      <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
      <div className='flex gap-1 px-4 w-full rounded-lg bg-secondary'>
        <img
          src='/assets/icons/search.svg'
          alt='search'
          width={24}
          height={24}
        />
        <Input
          type='text'
          placeholder='Search'
          className='explore-search'
          value={searchValue}
          onChange={handleSearchOnChange}
        />
      </div>
    </div>
    <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
      <h2 className='body-bold md:h3-bold'>{showSearchResults? "Search result": "Popular Today"}</h2>
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
      {showSearchResults ? (<SearchResults 
      isSearching = {isSearching}
      searchedPost = {searchedPost}
      />): showPosts && ( <GridPostList postList={postDoc}/>)}
    </div>
    <div className=" mt-4">

      {!isSearching && (loading && !allCaughtUp && (<Loader/>))}
      {allCaughtUp && !isSearching  && ( (
        <p className="text-muted-foreground mt-10 text-center w-full">All caught up ✅</p>
      ))}
    </div>
  </div>
	);
};

export default Explore;

// import GridPostList from "@/components/shared/GridPostList";
// import Loader from "@/components/shared/Loader";
// import PostCard from "@/components/shared/PostCard";
// import SearchResults from "@/components/shared/SearchResults";
// import { Input } from "@/components/ui/input";
// import useDebounce from "@/hooks/useDebounce";
// import authService from "@/lib/appwrite/auth_services";
// import postServices from "@/lib/appwrite/post_services";
// import { useEffect, useRef, useState } from "react";

// const Explore = () => {
// 	const [searchValue, setSearchValue] = useState("");
//   const [searchedPost,setSearchedPost]= useState([]);
//   const [isSearching,setIsSearchig] = useState(false)
//   const debouncedValue = useDebounce(searchValue,500)
//   const [page,setPage]= useState(1)
//   const [posts,setPosts] = useState([])
//   const [isLoading, setIsLoading] = useState(true);
//   const lastPostIdRef = useRef(null);
//   const [hasMorePosts, setHasMorePosts] = useState(true);
//   const [lastPostId,setLastPostId]=useState('')
//   const [working,setWorking]=useState(false)

//   const handleSearchOnChange=async ()=>{
//     setIsSearchig(true)
//     const data= await postServices.searchPosts(debouncedValue)
//     console.log(data)
//     setSearchedPost(data)
//     setIsSearchig(false)
//   }

//   const fetchInitialPosts = async () => {
//     try {
//       const initialPosts = await postServices.getInfinitePosts();
//       setPosts(initialPosts.documents);
//       console.log(initialPosts)
//       setLastPostId((id )=> {
//         if (initialPosts?.documents?.length) {
//             const newLastPostId = initialPosts.documents[initialPosts.documents.length - 1]?.$id;
//             console.log(newLastPostId);
//             return newLastPostId;
//         }
//         return id;
//     });
//           console.log(lastPostId)

//     } catch (error) {
//       console.error('Error fetching initial posts:', error);

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInitialPosts();
//   }, []);

//   const fetchMorePosts = async () => {
//     setIsLoading(true);
//     console.log('fetch more posts called')
//     try {
//       console.log(working)
//       console.log(lastPostId)
//       if(working){
//         console.log("Infinite post called")
//         const morePosts = await postServices.getInfinitePosts(lastPostId);

//         console.log(morePosts)
//         if(lastPostId && morePosts.documents.length === 0){
//           return null
//         }
//         if (!morePosts?.documents?.length) {
//           setHasMorePosts(false);
//         } else {
//           setPosts(prevPosts => [...prevPosts, ...morePosts.documents]);
//           const id= morePosts?.documents[morePosts?.documents?.length - 1]?.$id;
//           console.log(id)
//           console.log(morePosts)
//           console.log(posts)
//           setLastPostId(id => {
//             if (morePosts?.documents?.length) {
//                 const newLastPostId = morePosts.documents[morePosts.documents.length - 1]?.$id;
//                 console.log(newLastPostId);
//                 return newLastPostId;
//             }
//             return id;
//         });

//         }
//         return morePosts;

//       }
//     } catch (error) {
//       console.error('Error fetching more posts:', error);
//       // Handle error gracefully
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleScroll =async () => {
//     try {
//       const scrollHeight = document.documentElement.scrollHeight;
//       const scrollTop = document.documentElement.scrollTop;
//       const clientHeight = document.documentElement.clientHeight;

//       if (hasMorePosts && Math.floor(scrollTop + clientHeight) >= Math.floor(scrollHeight - 50)) {

//         console.log("fetching More post")
//       setWorking(prev => !prev);
//         console.log(working)
//       await fetchMorePosts();

//           console.log(working)
//         setWorking(false)

//       }

//     } catch (error) {
//       console.log(error)
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
// }, [hasMorePosts]);

//   const showSearchResults = searchValue !=='';
//   const showPosts = !showSearchResults && (posts?.length ===0)
// console.log(posts)
// 	return (
// 		<div className='explore-container'>
// 			<div className='explore-inner_container'>
// 				<h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
// 				<div className='flex gap-1 px-4 w-full rounded-lg bg-secondary'>
// 					<img
// 						src='/assets/icons/search.svg'
// 						alt='search'
// 						width={24}
// 						height={24}
// 					/>
// 					<Input
// 						type='text'
// 						placeholder='Search'
// 						className='explore-search'
// 						value={searchValue}
// 						onChange={handleSearchOnChange}
// 					/>
// 				</div>
// 			</div>
// 			<div className='flex-between w-full max-w-5xl mt-16 mb-7'>
// 				<h2 className='body-bold md:h3-bold'>Popular Today</h2>
// 				<div className='flex-center gap-3 bg-secondary rounded-xl px-4 py-2 cursor-pointer'>
// 					<p className='small-medium md:base-medium text-foreground'>
// 						All
// 					</p>
// 					<img
// 						src='/assets/icons/filter.svg'
// 						alt='filter'
// 						width={20}
// 						height={20}
// 					/>
// 				</div>
// 			</div>
//       <div className="flex flex-wrap gap-9 w-full max-w-5xl">
//         {showSearchResults ? (<SearchResults/>): isLoading && showPosts? (
//           <p className="text-muted-foreground mt-10 text-center w-full">End of posts</p>
//         ):(posts?.map((post,index)=>(
//           <PostCard key={`page-${index}`} post={post}/>
//         )))}
//       </div>
//         {isLoading && (<Loader/>)}
// 		</div>
// 	);
// };

// export default Explore;