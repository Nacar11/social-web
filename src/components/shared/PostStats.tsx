import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { BookmarksSimple, Heart } from "@phosphor-icons/react";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
    darkMode: boolean;
}

const PostStats = ({post, userId, darkMode }: PostStatsProps) => {
    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => 
    record.post.$id === post?.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if(hasLiked){
        newLikes = newLikes.filter((id) => id !== userId)
    }
    else{
        newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({postId: post?.$id || '', likesArray: newLikes})
    }

    const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if(savedPostRecord){
        setIsSaved(false);
        deleteSavedPost(savedPostRecord.$id);
    }
    else{
        savePost({postId: post?.$id || '', userId});
        setIsSaved(true);
    }
    }
        return (
            <div className="flex justify-between items-center z-20">
                <div className="flex items-center gap-2 mr-5">
                    <div onClick={handleLikePost} className="cursor-pointer">
                        {
                            checkIsLiked(likes, userId) ?
                            (<Heart weight="fill" color="#ff0000" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"/>)
                            :
                            (<Heart color={darkMode ? "#FFFFFF" : "#09090A"} className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"/>)
                        }
                        </div>
                        <p className={`small-medium lg:base-medium ${darkMode ? 'text-light-1' : 'text-dark-2'}`}>
                            {likes.length}
                        </p>
                </div>
                <div className="flex items-center gap-2 mr-5">
                    {isSavingPost || isDeletingSaved ? 
                        <Loader/> 
                        : 
                        <div onClick={handleSavePost} className="cursor-pointer">
                            {
                                isSaved ?
                                (<BookmarksSimple weight="fill" color="#5D5FEF" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"/>)
                                :
                                (<BookmarksSimple color={darkMode ? "#FFFFFF" : "#09090A"} className=" w-[24px] h-[24px] md:w-[30px] md:h-[30px]"/>)
                            }
                            </div>
                        }
                </div>
            </div>
        )
        }

export default PostStats