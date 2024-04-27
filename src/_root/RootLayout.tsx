import BottomBar from "@/components/shared/BottomBar";
import { LeftSideBar } from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";
import { useUserContext } from '@/context/AuthContext';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    const { isEmailVerified } = useUserContext();  
    return (
   <div className="w-full md:flex">
    <TopBar/>
    <LeftSideBar disableNavigation={!isEmailVerified} />
    <section className="flex flex-1 h-full">
      <Outlet/>
    </section>

    <BottomBar/>
   </div>
  )
}

export default RootLayout