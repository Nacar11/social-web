import { Button } from "@/components/ui/button";
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
type UserFollowCardProps = {
    user: Models.Document;
}

const UserFollowCard = ({user}: UserFollowCardProps) =>  {
  return (
    <div className="flex flex-col flex-center gap-1">
     <Link to={`/profile/${user.id}`} 
           className='py-3'>
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="profile"
            className="h-14 w-14 rounded-full">
          </img>
      </Link>
        <p className="body-bold">
          {user.name}
        </p>
        <p className="small-regular text-light-3">
          @{user.username}
        </p>
        <div className="pt-2">
          <Button type="submit" className="shad-button_primary font-bold base-regular">Follow</Button>
        </div>
        
    </div>
  )
}

export default UserFollowCard