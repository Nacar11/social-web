import LikedPostList from "@/_root/pages/LikedPosts";
import GridPostList from "@/components/shared/GridPostList";
import LoadingButton from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserByUsername, useUpdateUserBio } from "@/lib/react-query/queriesAndMutations";
import { bioValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { z } from "zod";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-dark-2">{label}</p>
  </div>
);

const Profile = () => {
  const { mutateAsync: updateUserBio, isPending: isLoadingCreate} = useUpdateUserBio();
  const { username } = useParams();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const [isEditBio, setIsEditBio] = useState(false);
  const { data: currentUser } = useGetUserByUsername(username || "");


  const form = useForm<z.infer<typeof bioValidation>>({
        resolver: zodResolver(bioValidation),
        defaultValues: {
        bio: currentUser?.bio ? currentUser.bio : "",
      },
  })

  const editBio = () => {
    console.log(user.id)
    console.log(currentUser?.$id)
    setIsEditBio(prevIsEditBio => !prevIsEditBio);
    if (!isEditBio && currentUser?.bio) {
      form.setValue('bio', currentUser.bio);
    }
  }

  async function onSubmit(values: z.infer<typeof bioValidation>) {
    const res = await updateUserBio(values.bio)
    if(res) setIsEditBio(false)
  }
  
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
      </div>
    );

  return (
     <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
           <img src={currentUser.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full">
            </img>
        
        <div className="flex flex-col flex-1 justify-between md:mt-2">
          <div className="flex flex-col w-full">
            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
              {currentUser.name}
            </h1>
            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
              @{currentUser.username}
            </p>
          </div>

          <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            <StatBlock value={currentUser!.posts.length} label="Posts" />
            <StatBlock value={20} label="Followers" />
            <StatBlock value={20} label="Following" />
          </div>
          <div className="mt-7">
             { isEditBio ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col gap-4 w-full max-w-5xl">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormControl className="">
                        <Textarea className="shad-textarea border border-black custom-scrollbar" placeholder="Make a Caption! What's on your mind?" {...field} />
                      </FormControl>
                    </FormItem>
                       )}
                    />
            <div className="flex gap-2 justify-end items-center">
              {isLoadingCreate ? 
                <LoadingButton>
                  Confirming
                </LoadingButton> :
                (
                  <Button type="submit" 
                  className="shad-button_primary"
                >
                   Confirm
                </Button>)
            }
             <div className={`${user.id == currentUser.$id && "hidden"} md:hidden`}>
              <Button
                className='h-10 shad-button_white flex-center gap-2 rounded-lg'>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={16}
                    height={16}
                  />
                <p onClick={() => editBio()} className="flex whitespace-nowrap small-medium">
                  {isEditBio ? "Cancel" : "Edit Bio"}
                </p>
              </Button>
            </div>
        </div>
              </form>
            </Form>
             )
             :
             (
              currentUser?.bio ?
              <div>
                <p className="small-medium md:base-medium text-center xl:text-left max-w-screen-sm">
                  {currentUser.bio}
                </p>
              </div>
              :
              <div>
                <p className="small-medium md:base-medium text-center xl:text-left max-w-screen-sm">
                  No Bio
                </p>
              </div>
             )
            }
            </div>
          </div>
          <div className={`${user.id == currentUser.$id && "hidden"} flex justify-center gap-4`}>
            <div>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className="h-10 shad-button_white flex-center gap-2 rounded-lg">
                <img
                  src={"/assets/icons/message.png"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Message
                </p>
              </Link>
            </div>
            <div>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
            <div className={`${user.id !== currentUser.$id && "hidden"} `}>
              <div className="hidden md:block">
                <Button
                  className='h-10 shad-button_white flex-center gap-2 rounded-lg'>
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={16}
                      height={16}
                    />
                  <p onClick={() => editBio()} className="flex whitespace-nowrap small-medium">
                    {isEditBio ? "Cancel" : "Edit Bio"}
                  </p>
                </Button>
              </div>
              
            </div>
        </div>
      </div>
          {currentUser.$id == user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${currentUser.username}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${currentUser.username}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.png"}
              alt="posts"
              width={28}
              height={28}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${currentUser.username}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${currentUser.username}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/heart.png"}
              alt="like"
              width={28}
              height={28}
            />
            Liked Posts
          </Link>
        </div>
      )}
        <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPostList />} />
        )}
      </Routes>
      <Outlet />
    </div>
    
  )
}

export default Profile