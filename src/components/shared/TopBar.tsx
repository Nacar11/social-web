import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { SignOut } from "@phosphor-icons/react";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const TopBar = () => {
  const {mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if(isSuccess){
      navigate(0);
    }
  },[isSuccess]
  )
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="py-3 md:p-0 flex gap-3 items-center">
          <img src="/assets/images/logo_complete.png" alt="logo" width={130} height={325}/>
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
           <SignOut size={32} />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="profile"
            className="h-8 w-8 rounded-full">
            </img>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar