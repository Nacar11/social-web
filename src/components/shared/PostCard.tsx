import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import { DotsThreeOutline } from "@phosphor-icons/react";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;

}

const PostCard = ({post}: PostCardProps) => {
 const { user } = useUserContext();

 if(!post.creator) return;
  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/${post.creator.username}`}>
                    <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="creator"
                    className="rounded-full border-2 border-primary-500 w-12 lg:h-12" />
                </Link>
                <div className="flex flex-col">
                    <Link to={`/${post.creator.username}`}>
                    <p className="base-medium lg:body-bold text-dark-2">
                        {post.creator.name}
                    </p>
                    </Link>
                    <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular">
                            {formatDateString(post.$createdAt)}
                        </p>
                        -
                        <p className="subtle-semibold lg:small-regular">
                            {post.location}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/update-post/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}>
                <DotsThreeOutline size={20} weight="fill" />
            </Link>
        </div>
        <Link to={`/posts/${post.$id}`}>
            <div className="pl-2 small-medium lg:base-medium py-5">
                <p>
                    {post.caption}
                </p>
                <ul className="flex gap-1 mt-2">
                    {post.tags.map((tag:string) =>(
                    <li key={tag} className="text-light-3">
                        #{tag}
                    </li>
                    ))}
                </ul>
            </div>
            <img
            src={post.imageUrl || '/assets/icons/profile/placeholder.svg'}
            className="post-card_img"
            alt="post-image"/>
        </Link>
        <PostStats darkMode={false} post={post} userId={user.id}/>
        <Separator className="mt-6 bg-gray-300"/>
    </div>
  )
}

export default PostCard