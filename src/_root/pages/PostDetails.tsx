import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { formatDateString } from '@/lib/utils';
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();
  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? <Loader/> : (
        <div className="post_details-card">
          <img
          src={post?.imageUrl}
          alt="post"
          className="post_details-img"
          />
           <div className="post_details-info">
            <div className="flex-between w-full">
                <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                    <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="creator"
                    className="rounded-full w-8 h-8 lg:w-12 lg:h-12" />
                    <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-dark-2">
                        {post?.creator.name}
                    </p>
                     <div className="flex-center gap-2 text-dark-4">
                        <p className="subtle-semibold lg:small-regular">
                            {formatDateString(post?.$createdAt || '')}
                        </p>
                        -
                        <p className="subtle-semibold lg:small-regular">
                            {post?.location}
                        </p>
                      </div>
                    </div>
                </Link>
                <div className="flex-center">
                  <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                    <PencilSimple className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]"/>
                  </Link>
                  <Button variant="ghost" 
                    onClick={handleDeletePost}
                    className={`ghost_details-delete_btn 
                    ${user.id !== post?.creator.$id && 'hidden'}`}
                    >
                    <Trash color="#ce0909" className="w-[24px] h-[24px] md:w-[30px] md:h-[30px]" />
                  </Button>
                </div>
              </div>
              <hr className="border w-full border-light-2"/>
                <div className="flex flex-col flex-1 w-full base-regular lg:body-medium">
                <p>
                    {post?.caption}
                </p>
                <ul className="flex gap-1 mt-2">
                    {post?.tags.map((tag:string) =>(
                    <li key={tag} className="text-dark-3 small-regular lg:small-medium">
                      <span className="text-primary-500 ">
                        #
                      </span>
                        {tag}
                    </li>
                    ))}
                </ul>
            </div>
            <div className="w-full">
              <PostStats darkMode={false} post={post} userId={user.id}/>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails