import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import { FunnelSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching} = useSearchPosts(debouncedSearch)
  const [position, setPosition] = React.useState("bottom")

  useEffect(() => {
    if(inView && !searchValue) fetchNextPage();
},[inView, searchValue])

  if(!posts){
    return(
      <div className="flex-center w-full h-hull">
        <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
      </div>
    )
  }

   const shouldShowSearchResults = searchValue !== '';
   const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0)

      return (
        <div className="explore-container">
          <div className="explore-inner_container">
            <h2 className="h3-bold md:h2-bold w-full">Search Post</h2>
            <div className="flex-center gap-1 px-4 w-full rounded-lg bg-light-2">
              <MagnifyingGlass 
              className="w-[24px] h-[24px] md:w-[35px] md:h-[35px]" />
              <Input
              type="text"
              placeholder="Search"
              className="explore-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              />
              </div>
            </div>
          <div className="flex-between w-full max-w-5xl mt-16 mb-7">
            <h3 className="body-bold md:h3-bold w-full">Popular</h3>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
               <div className="flex-center gap-3 bg-light-2 rounded-xl px-4 py-2 cursor-pointer">
                <p className="small-medium md:base-medium text-dark-2">
                  All
                </p>
              <FunnelSimple color="#000000" className=" w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
            </div>
              </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-light-2">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem className="explore-filter_select" value="top">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="explore-filter_select" value="bottom">Trending</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="explore-filter_select" value="right">Latest</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            
          </div>
          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
            {shouldShowSearchResults ? (
              <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}/>
            ) :
            shouldShowPosts ? (
              <p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
            ) : posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents}/>
            ))
          }
          </div>
          {hasNextPage && !searchValue &&(
            <div ref={ref} className="mt-10">
              <Loader/>

            </div>

          )}

        </div>
      )
}

export default Explore