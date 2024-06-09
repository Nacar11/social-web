import { Loader2 } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchPostsResultsProps = {
isSearchFetching: boolean;
searchedPosts: any;
}

const SearchPostsResults = ({isSearchFetching, searchedPosts}: SearchPostsResultsProps) => {
    if(isSearchFetching) 
    return (
          <section className="text-center h-[400px] w-full flex-center">
            <Loader2 className="loader-black" />
          </section>
    )
          
    if(searchedPosts && searchedPosts.documents.length > 0)
      return(
        <GridPostList posts={searchedPosts.documents}/>
      )

      return(
        <p className="text-light-4 mt-10 text-center w-full">
          No Results Found
        </p>
      )

    



    
  
}

export default SearchPostsResults