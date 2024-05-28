import { Loader2 } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
isSearchFetching: boolean;
searchedPosts: any;
}

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultsProps) => {
    if(isSearchFetching) 
    return (
          <section className="text-center h-[400px] w-full flex-center">
            <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
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

export default SearchResults