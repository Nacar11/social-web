import BottomBar from "@/components/shared/BottomBar";
import { LeftSideBar } from "@/components/shared/LeftSideBar";
import LoadingDialog from "@/components/shared/LoadingDialog";
import TopBar from "@/components/shared/TopBar";
import { useUserContext } from '@/context/AuthContext';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    const { isEmailVerified, isLoading } = useUserContext();  
    return (
   <div className="w-full md:flex">
    <LoadingDialog 
    isOpen={isLoading} 
    ></LoadingDialog>
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