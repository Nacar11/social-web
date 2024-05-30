import UserFollowCard from "@/components/shared/UserFollowCard";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Models } from 'appwrite';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const RightSideBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: users, isPending } = useGetUsers();
  const [usersData, setUsersData] = useState<Models.Document[]>([]);

  useEffect(() => {
    if (users) {
    setUsersData(users.documents)
    }
      
  }, []);

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

          {isPending && !users ? (
            <div className="flex-center justify-center w-full h-full">
            <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
            </div>
          ) :
          <ul className="rightsidebar-grid">
            {usersData.map((user: Models.Document ) =>
            (
            <li key={user.$id} className="flex justify-center w-full">
            <UserFollowCard user={user}/>
            </li>
            )
             )}
          </ul>
          }

    </nav>
  )
}