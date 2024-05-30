import UserFollowCard from "@/components/shared/UserFollowCard";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsers, useSearchUsers } from '@/lib/react-query/queriesAndMutations';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Models } from 'appwrite';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const RightSideBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: users, isPending } = useGetUsers();
  const { data: searchedUsers, isFetching: isSearchFetching} = useSearchUsers(debouncedSearch)
  const [usersData, setUsersData] = useState<Models.Document[]>([]);
  

  const shouldShowSearchResults = searchValue !== '';

  return (
    <nav className="rightsidebar">
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
        <h2 className="h3-bold md:h2-bold text-left w-full">Other Users
          </h2>

          {isSearchFetching || isPending ? 
            (
              <div className="flex-center justify-center w-full h-full">
                <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
              </div>
            )
            :
            shouldShowSearchResults  ?  
             (searchedUsers &&  searchedUsers.documents.length > 0 ?
              <ul className="rightsidebar-grid">
                {searchedUsers.documents.map((user: Models.Document) => (
                  <li key={user.$id} className="flex justify-center w-full">
                    <UserFollowCard user={user} />
                  </li>
                  ))}
              </ul>
              :
              <p className="text-light-4 mt-10 text-center w-full">
                No Users Found
              </p>
              )
              : 
              (users &&  users.documents.length > 0 ?
                <ul className="rightsidebar-grid">
                  {users.documents.map((user: Models.Document) => (
                    <li key={user.$id} className="flex justify-center w-full">
                      <UserFollowCard user={user} />
                    </li>
                   ))}
                </ul>
                :
                <p className="text-light-4 mt-10 text-center w-full">
                  No Users Found
                </p>
              )
            }
    </nav>
  )
}