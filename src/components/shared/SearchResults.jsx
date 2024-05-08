import GridPostList from "./GridPostList"
import Loader from "./Loader"

const SearchResults = ({isSearching, searchedPost}) => {

  if(isSearching){
    return <Loader/>
  }
  if(searchedPost && searchedPost?.documents?.length > 0){
    return (
      <GridPostList postList={searchedPost?.documents}/>
    )
  }
    return (
      <p className=" text-muted mt-10 text-center w-full">No results found ☹️ </p>
    )
  
}

export default SearchResults